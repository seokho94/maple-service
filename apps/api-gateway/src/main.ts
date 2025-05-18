import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ApiGatewayModule } from './api-gateway.module';

async function bootstrap() {
	const app = await NestFactory.create(ApiGatewayModule);

	app.useGlobalPipes(new ValidationPipe({
			transform: true,
			transformOptions: { enableImplicitConversion: true },
			skipMissingProperties: true,
			forbidNonWhitelisted: true,
		})
	); 

	await app.startAllMicroservices();
	await app.listen(process.env.GATEWAY_PORT || 3000);
	console.log(`API Gateway is running on: ${await app.getUrl()}`);
}
bootstrap();
