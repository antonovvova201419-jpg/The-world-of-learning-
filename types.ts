export enum FileCategory {
  IMAGE = 'Изображения',
  AUDIO = 'Аудио',
  VIDEO = 'Видео',
  ARCHIVE = 'Архивы',
  DOCUMENT = 'Документы',
  EXECUTABLE = 'Программы',
  SYSTEM = 'Системные',
  CODE = 'Код',
  GAME = 'Игровые / Valve'
}

export interface FileExtensionData {
  ext: string;
  name: string;
  category: FileCategory;
  description: string;
  fullDescription: string;
  osCompatibility: string[];
  technologies: string[];
  pros: string[];
  cons: string[];
  popularity: number; // 0-100 for chart
}
