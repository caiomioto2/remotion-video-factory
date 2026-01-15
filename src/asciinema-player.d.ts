declare module 'asciinema-player' {
  export interface AsciinemaPlayerOptions {
    cols?: number;
    rows?: number;
    autoPlay?: boolean;
    preload?: boolean;
    loop?: boolean | number;
    startAt?: number | string;
    speed?: number;
    idleTimeLimit?: number;
    theme?: string;
    poster?: string;
    fit?: 'width' | 'height' | 'both' | 'none';
    fontSize?: string | 'small' | 'medium' | 'big';
  }

  export interface AsciinemaPlayer {
    play(): void;
    pause(): void;
    seek(time: number): void;
    getCurrentTime(): number;
    getDuration(): number;
  }

  export function create(
    src: string,
    element: HTMLElement,
    options?: AsciinemaPlayerOptions
  ): AsciinemaPlayer;
}
