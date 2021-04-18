//@ts-nocheck

import React, { useEffect } from 'react';
import styles from './Canvas.module.css';

function init() {
  var canvas = document.getElementById(styles['canvas']) as HTMLCanvasElement;
  var ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  var width = 0;
  var height = 0;

  var iBubbles = 10;

  var aBubblesX = [];
  var aBubblesY = [];
  var aBubblesSize = [];
  var aBubblesSpeed = [];
  var aZeroOrOne = [];

  var random = (min: number | number[], max: number | undefined) => {
    if (typeof max === 'undefined') {
      return Math.random() * (min[1] - min[0]) + min[0];
    } else {
      return Math.random() * (max - min) + min;
    }
  };

  class NumberElementConfig {
    constructor(
      values: string[],
      xMinMax: number[],
      yMinMax: number[],
      sizeMinMax: number[],
      speedMinMax: number[],
    ) {
      this.values = values;
      this.x = xMinMax;
      this.y = yMinMax;
      this.size = sizeMinMax;
      this.speed = speedMinMax;
    }
  }

  class NumberElement {
    constructor(numberElementConfig) {
      this.config = numberElementConfig;
      this.spawn();
    }

    spawn() {
      this.value = this.config.values[Math.floor(random(0, 2))];
      this.size = random(this.config.size);
      this.speed = random(this.config.speed);
      this.x = random(this.config.x);
      this.y = random(this.config.y);

      this.viewportOffset = this.config.size[1] + 20;

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
        this[key] = value + this.size;
      } else {
        let key = ['x', 'y'][Math.floor(random(0, 2))];
        this[key] = 0 - this.size;
      }
    }

    isInViewport() {
      if (
        this.x < 0 - this.viewportOffset ||
        this.y < 0 - this.viewportOffset ||
        this.x > innerWidth + this.viewportOffset ||
        this.y > innerHeight + this.viewportOffset
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

  class NumberElementCollector {
    constructor(count = 100, spawnTimeout = 20) {
      this.numberElements = [];

      let generator = () => {
        if (count != this.numberElements.length) {
          this.numberElements.push(this.generateNumberElement());
          setTimeout(generator, spawnTimeout);
        }
      };
      generator();
    }

    get() {
      return this.numberElements;
    }

    moveAll() {
      for (let i = 0; i < this.numberElements.length; ++i) {
        let element = this.numberElements[i];
        element.move();
        if (!element.isInViewport()) {
          element.respawn();
        }
      }
    }

    generateNumberElement() {
      return new NumberElement(
        new NumberElementConfig(
          ['0', '1'],
          [0, innerWidth], // x
          [0, innerHeight], // y
          [15, 50], // size
          [-8, 8], // speed
        ),
      );
    }
  }

  var numberElementCollector = new NumberElementCollector();

  var draw = () => {
    ctx.beginPath();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    for (let numberElement of numberElementCollector.get()) {
      ctx.font = numberElement.size / 1.5 + 'px arial black';
      ctx.textBaseline = 'bottom';
      ctx.textAlign = 'left';
      ctx.fillText(numberElement.value, numberElement.x, numberElement.y);
    }
    ctx.fillStyle = 'rgba(0, 0, 0, 0.07)';
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.08)';
    ctx.stroke();
  };

  var process = () => {
    width = canvas.width = innerWidth;
    height = canvas.height = innerHeight;

    numberElementCollector.moveAll();
    draw();

    requestAnimationFrame(process);
  };

  return process;
}

export default function Canvas() {
  useEffect(() => {
    const body = document.querySelector('body');

    if (body) {
      const canvas = document.createElement('canvas');
      canvas.id = styles['canvas'];
      body.prepend(canvas);
      init()();
    }

    return () => {
      const canvas = document.getElementById(styles['canvas']);
      if (canvas) canvas.remove();
    };
  }, []);

  return <></>;
}
