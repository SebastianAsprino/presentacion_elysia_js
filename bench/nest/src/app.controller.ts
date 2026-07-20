import { Controller, Get, Header } from '@nestjs/common'

@Controller()
export class AppController {
  @Get(['/', '/nest'])
  @Header('Cache-Control', 'no-store')
  hello(): string {
    return 'hello world'
  }
}
