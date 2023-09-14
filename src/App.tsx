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

export function App() {
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
            ></Textarea>
            <Textarea
              placeholder="Resultado gerado pela IA"
              className="resize-none p-4 leading-relaxed "
              readOnly
            ></Textarea>
          </div>
          <p className="text-sm text-muted-foreground">
            Lembre-se você pode usar a variável{" "}
            <code className="text-violet-400">{`{transcription}`}</code> no seu
            prompt para adicionar o conteúdo da transcrição do vídeo selecionado
          </p>
        </section>
        <aside className="w-80 space-y-6">
          <form className="space-y-6">
            <label
              className="p-6 border rounded-md flex aspect-video cursor-pointer border-dashed text-sm items-center justify-center flex-col text-muted-foreground hover:bg-primary/5 transition-colors duration-200"
              htmlFor="video"
            >
              <FileVideo className="h-8 w-8 mb-2" />
              Selecione um video
            </label>
            <input
              className="sr-only"
              type="file"
              name="video"
              id="video"
              accept="video/mp4"
            />

            <Separator />
            <div className="space-y-2">
              <Label htmlFor="transcription_prompt">
                Prompt de transcrição
              </Label>
              <Textarea
                id={"transcription_prompt"}
                className="h-20 leading-relaxed"
                placeholder="Inclua palavras chaves mencionadas no vídeo separadas por vírgula (,)"
              />
            </div>
            <Button type="submit" className="w-full">
              Carregar Video
              <Upload className="w-4 h-4 ml-2" />
            </Button>
          </form>
          <Separator />
          <form className="space-y-2">
            <div className="space-y-2">
              <Label>Prompt</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue
                    placeholder="Selecione um prompt"
                    className="text-muted-foreground"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="title">Titulo do Youtube</SelectItem>
                  <SelectItem value="description">
                    Descrição do Youtube
                  </SelectItem>
                </SelectContent>
              </Select>
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
              <Label>Temperatura</Label>
              <Slider min={0} max={1} step={0.1}></Slider>
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
