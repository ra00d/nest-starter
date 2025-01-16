import { Injectable, OnModuleInit } from '@nestjs/common';
import { ViteDevServer } from 'vite';

@Injectable()
export class WebService implements OnModuleInit {
  vite: ViteDevServer;
  async onModuleInit() {
    if (process.env.NODE_ENV !== 'production') {
      // const { createServer } = await import('vite');
      // this.vite = await createServer({
      //   server: { middlewareMode: true },
      //   appType: 'custom',
      // });
    }
  }
  setVite(v: any) {
    this.vite = v;
  }
  // getVite() {
  //   return this.vite;
  // }
  async render(url: string) {
    if (process.env.NODE_ENV !== 'production') {
      const templateHtml = `


	<script type="module" src="/src/resource/assets/ts/script.ts"></script>
  
`;
      // Always read fresh template in development
      const template = await this.vite.transformIndexHtml(url, templateHtml);
      console.log(template);

      const t = await this.vite.ssrLoadModule(
        '/src/resource/assets/ts/script.ts',
      );
      // console.log(t);

      // console.log(template);

      return template;
    } else {
      return '';
    }
  }
}
