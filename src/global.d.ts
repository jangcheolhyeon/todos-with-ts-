// module.css를 설정하기 위한 파일

declare module "*.css" {
    const content: { [className: string]: string };
    export = content;
  }