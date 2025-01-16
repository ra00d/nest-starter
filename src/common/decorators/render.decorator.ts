import { RENDER_METADATA } from '@nestjs/common/constants';

export function Render(template: string): MethodDecorator {
  return (
    target: object,
    key: string | symbol,
    descriptor: TypedPropertyDescriptor<any>,
  ) => {
    function register() {
      const obj = descriptor.value();
      return {
        ...obj,
        test: 1,
      };
    }

    Reflect.defineMetadata(RENDER_METADATA, template, register);
    return {
      value: register as any,
      writable: descriptor.writable,
      configurable: descriptor.configurable,
      enumerable: descriptor.enumerable,
    };
  };
}
