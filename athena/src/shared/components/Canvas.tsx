import { useEffect } from 'react';

function Animate(symbols: string[], signal: AbortSignal) {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  const random = (min: any, max?: any) => {
    if (typeof max === 'undefined') {
      return Math.random() * (min[1] - min[0]) + min[0];
    } else {
      return Math.random() * (max - min) + min;
    }
  };

  interface ParticleConfig {
    values: string[];
    x: number[];
    y: number[];
    size: number[];
    speed: number[];
  }

  class Particle {
    constructor(public config: ParticleConfig) {
      this.spawn();
    }

    public value!: string;
    public size!: number;
    public speed!: number;
    public x!: number;
    public y!: number;
    public offset!: number;

    spawn() {
      this.value = this.config.values[Math.floor(random(0, 2))];
      this.size = random(this.config.size);
      this.speed = random(this.config.speed);
      this.x = random(this.config.x);
      this.y = random(this.config.y);

      this.offset = this.config.size[1] + 20;

      if (Math.abs(this.speed) < 1) {
        this.speed += this.speed < 0 ? -1 : 1;
      }

      this.setSpawnPosition();
    }

    respawn() {
      this.spawn();
    }

    setSpawnPosition() {
      if (this.speed < 0) {
        let key = ['x', 'y'][Math.floor(random(0, 2))];
        let value = key === 'x' ? innerWidth : innerHeight;
        this[key as 'x' | 'y'] = value + this.size;
      } else {
        let key = ['x', 'y'][Math.floor(random(0, 2))];
        this[key as 'x' | 'y'] = 0 - this.size;
      }
    }

    viewport() {
      if (
        this.x < 0 - this.offset ||
        this.y < 0 - this.offset ||
        this.x > innerWidth + this.offset ||
        this.y > innerHeight + this.offset
      ) {
        return false;
      } else {
        return true;
      }
    }

    move() {
      this.x += this.speed;
      this.y += this.speed;
    }
  }

  class ParticleCollector {
    constructor(count = 100, spawnTimeout = 20) {
      this.particles = [];

      let generator = () => {
        if (count != this.particles.length && !signal.aborted) {
          this.particles.push(
            new Particle({
              values: symbols,
              x: [0, innerWidth],
              y: [0, innerHeight],
              size: [15, 50],
              speed: [-8, 8],
            }),
          );
          setTimeout(generator, spawnTimeout);
        }
      };
      generator();
    }

    private particles: Particle[];

    get() {
      return this.particles;
    }

    move() {
      for (const particle of this.particles) {
        particle.move();
        if (!particle.viewport()) {
          particle.respawn();
        }
      }
    }
  }

  const collector = new ParticleCollector();

  const draw = () => {
    ctx.beginPath();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    for (let particle of collector.get()) {
      ctx.font = particle.size / 1.5 + 'px arial black';
      ctx.textBaseline = 'bottom';
      ctx.textAlign = 'left';
      ctx.fillText(particle.value, particle.x, particle.y);
    }
    ctx.fillStyle = 'rgba(0, 0, 0, 0.07)';
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.08)';
    ctx.stroke();
  };

  const process = () => {
    if (!signal.aborted) {
      canvas.width = innerWidth;
      canvas.height = innerHeight;

      collector.move();
      draw();

      requestAnimationFrame(process);
    }
  };

  process();
}

interface Props {
  particles: string[];
}

export default function Canvas(props: Props) {
  useEffect(() => {
    const controller = new AbortController();
    const canvas = document.createElement('canvas');
    canvas.id = 'canvas';
    document.body.prepend(canvas);
    Animate(props.particles, controller.signal);
    return () => {
      controller.abort();
      canvas.remove();
    };
  }, []);

  return null;
}
