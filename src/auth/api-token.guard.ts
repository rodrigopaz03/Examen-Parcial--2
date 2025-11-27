import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class ApiTokenGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const apiToken = request.headers['x-api-token'] as string;

    if (!apiToken) {
      throw new UnauthorizedException('API token missing');
    }

    if (await this.authService.getUserToken(apiToken)) {
      await this.authService.ReduceToken(apiToken);
      return true;
    } else {
      throw new UnauthorizedException('Invalid API token');
    }
  }
}