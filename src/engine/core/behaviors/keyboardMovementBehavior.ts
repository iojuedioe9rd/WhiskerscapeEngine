﻿/// <reference path="basebehavior.ts" />
/// <reference path="behaviormanager.ts" />

namespace TSE {
  export class KeyboardMovementBehaviorData implements IBehaviorData {
    public name: string;
    public speed: number = 0.1;

    public setFromJson(json: any): void {
      if (json.name === undefined) {
        throw new Error("Name must be defined in behavior data.");
      }

      this.name = String(json.name);

      if (json.speed !== undefined) {
        this.speed = Number(json.speed);
      }
    }
  }

  export class KeyboardMovementBehaviorBuilder implements IBehaviorBuilder {
    public get type(): string {
      return "keyboardMovement";
    }

    public buildFromJson(json: any): IBehavior {
      let data = new KeyboardMovementBehaviorData();
      data.setFromJson(json);
      return new KeyboardMovementBehavior(data);
    }
  }

  export class KeyboardMovementBehavior extends BaseBehavior {
    public speed: number = 0.1;

    public constructor(data: KeyboardMovementBehaviorData) {
      super(data);

      this.speed = data.speed;
    }

    public update(time: number): void {
      if (
        InputManager.isKeyDown(KeyCode.LeftArrow) ||
        InputManager.isKeyDown(KeyCode.A)
      ) {
        this._owner.transform.position.x -= this.speed;
      }
      if (
        InputManager.isKeyDown(KeyCode.RightArrow) ||
        InputManager.isKeyDown(KeyCode.D)
      ) {
        this._owner.transform.position.x += this.speed;
      }
      if (
        InputManager.isKeyDown(KeyCode.UpArrow) ||
        InputManager.isKeyDown(KeyCode.W)
      ) {
        this._owner.transform.position.y -= this.speed;
      }
      if (
        InputManager.isKeyDown(KeyCode.DownArrow) ||
        InputManager.isKeyDown(KeyCode.S)
      ) {
        this._owner.transform.position.y += this.speed;
      }

      super.update(time);
    }
  }

  BehaviorManager.registerBuilder(new KeyboardMovementBehaviorBuilder());
}
