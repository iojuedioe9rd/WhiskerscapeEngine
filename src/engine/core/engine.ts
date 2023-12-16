namespace TSE {
  /**
   * The main game engine class.
   * */
  export class Engine implements IMessageHandler {
    private _canvas: HTMLCanvasElement;
    private _basicShader: BasicShader;
    private _projection: Matrix4x4;
    private _previousTime: number = 0;
    private _gameSize: size2D = { width: 1024, height: 1024 };

    /**
     * Creates a new engine.
     *
     * @param {number} width width.
     * @param {number} height height.
     */
    public constructor(width: number = 1024, height: number = 1024) {
      // Set the width and height of the game size.
      this._gameSize.width = width;
      this._gameSize.height = height;
    }

    /**
     * Starts up this engine.
     * */
    public start(): void {
      this._canvas = GLUtilities.initialize();
      AssetManager.initialize();
      InputManager.initialize();
      ZoneManager.initialize();

      Message.subscribe("MOUSE_UP", this);

      gl.clearColor(146 / 255, 206 / 255, 247 / 255, 1.0);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);


  console.log(Math.fib(10));

      this._basicShader = new BasicShader();
      this._basicShader.use();

      // Load materials
      MaterialManager.registerMaterial(
        new Material("crate", "assets/textures/crate.jpg", Color.white()),
      );
      MaterialManager.registerMaterial(
        new Material("duck", "assets/textures/duck.png", Color.white()),
      );

      AudioManager.loadSoundFile("flap", "assets/sounds/flap.mp3", false);

      // Load
      this._projection = Matrix4x4.orthographic(
        0,
        this._canvas.width,
        this._canvas.height,
        0,
        -100.0,
        100.0,
      );

      // TODO: Change this to be read from a game configuration later.
      ZoneManager.changeZone(0);

      this.resize();
      this.loop();
    }

    /**
     * Resizes the canvas to fit the window.
     * */
    public resize(): void {
      if (this._canvas !== undefined) {
        this._canvas.width = window.innerWidth;
        this._canvas.height = window.innerHeight;

        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        this._projection = Matrix4x4.orthographic(
          0,
          this._canvas.width,
          this._canvas.height,
          0,
          -100.0,
          100.0,
        );
      }
    }

    public onMessage(message: Message): void {
      if (message.code === "MOUSE_UP") {
        let context = message.context as MouseContext;
        document.title = `Pos: [${context.position.x},${context.position.y}]`;

        AudioManager.playSound("flap");
      }
    }

    private loop(): void {
      this.update();
      this.render();

      requestAnimationFrame(this.loop.bind(this));
    }

    private update(): void {
      let delta = performance.now() - this._previousTime;

      MessageBus.update(delta);
      ZoneManager.update(delta);
      CollisionManager.update(delta);

      this._previousTime = performance.now();
    }

    private render(): void {
      gl.clear(gl.COLOR_BUFFER_BIT);

      ZoneManager.render(this._basicShader);
      // Set uniforms.
      let projectionPosition =
        this._basicShader.getUniformLocation("u_projection");
      gl.uniformMatrix4fv(
        projectionPosition,
        false,
        new Float32Array(this._projection.data),
      );
    }
  }
}
