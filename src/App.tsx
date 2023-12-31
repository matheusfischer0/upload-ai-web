import { Button } from "@/components/ui/button";

import { Github, FileVideo, Upload, Wand2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "./components/ui/textarea";
import { Label } from "./components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { Slider } from "./components/ui/slider";
import { VideoInputForm } from "./components/video-input-form";
import { useState } from "react";
import { PromptSelect } from "./components/prompt-select";

import { useCompletion } from "ai/react";

export function App() {
  const [temperature, setTemperature] = useState(0.5);
  const [videoId, setVideoId] = useState<string | null>(null);

  const {
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    completion,
    isLoading,
  } = useCompletion({
    api: "http://localhost:3333/ai/complete",
    body: {
      videoId,
      temperature,
    },
    headers: {
      "Content-Type": "application/json",
    },
  });

  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-6 py-3 flex items-center justify-between border-b">
        <h1 className="text-xl font-bold">upload.ai</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">
            Desenvolvido com 💙
          </span>
          <Separator orientation="vertical" className="h-6" />
          <Button variant={"secondary"}>
            <Github className="w-5 h-5 mr-2" />
            Github
          </Button>
        </div>
      </header>
      <main className="grow p-6 flex gap-6">
        <section className="flex flex-col gap-4 flex-1">
          <div className="grid grid-rows-2 gap-4 flex-1">
            <Textarea
              placeholder="Inclua o prompt para a IA ..."
              className="resize-none p-4 leading-relaxed "
              value={input}
              onChange={handleInputChange}
            ></Textarea>
            <Textarea
              placeholder="Resultado gerado pela IA"
              className="resize-none p-4 leading-relaxed "
              readOnly
              value={completion}
            ></Textarea>
          </div>
          <p className="text-sm text-muted-foreground">
            Lembre-se você pode usar a variável{" "}
            <code className="text-violet-400">{`{transcription}`}</code> no seu
            prompt para adicionar o conteúdo da transcrição do vídeo selecionado
          </p>
        </section>
        <aside className="w-80 space-y-6">
          <VideoInputForm onVideoUploaded={setVideoId} />
          <Separator />
          <form onSubmit={handleSubmit} className="space-y-2">
            <div className="space-y-2">
              <Label>Prompt</Label>
              <PromptSelect onPromptSelect={setInput} />
            </div>
            <div className="space-y-2">
              <Label>Modelo</Label>
              <Select defaultValue="gpt3.5" disabled>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt3.5">GPT 3.5-turbo 16k</SelectItem>
                </SelectContent>
              </Select>
              <span className="block text-xs text-muted-foreground italic">
                Você poderá customizar essa opção em breve
              </span>
            </div>
            <Separator />
            <div className="space-y-6">
              <Label>Temperatura </Label>
              <Label>{Number(temperature)}</Label>
              <Slider
                min={0}
                max={1}
                step={0.1}
                value={[temperature]}
                onValueChange={([value]) => {
                  setTemperature(value);
                }}
              ></Slider>
              <span className="block text-xs text-muted-foreground italic leading-relaxed">
                Valores mais altos tendem a deixar o resultado mais criativo e
                com posíveis erros.
              </span>
            </div>
            <Separator />
            <Button
              type="submit"
              className="w-full bg-slate-800"
              variant="outline"
              disabled={isLoading}
            >
              Executar
              <Wand2 className="w-4 h-4 ml-2" />
            </Button>
          </form>
        </aside>
      </main>
    </div>
  );
}
