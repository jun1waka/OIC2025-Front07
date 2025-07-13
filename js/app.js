/**
 * =================================================================
 * 親クラス (Superclass) の定義
 * =================================================================
 * 乗り物の基本的な機能を持つ `Vehicle` クラスを定義します。
 * これが継承の元となる「親」クラスです。
 */
class Vehicle {
  /**
   * 静的プロパティ (Static Property)
   * クラス自身に属するプロパティです。
   * インスタンスを作成しなくても `Vehicle.VEHICLE_TYPE` のようにアクセスできます。
   * このクラスがどのような種類のものかを示す定数など、共通の情報を定義するのに使います。
   */
  static VEHICLE_TYPE = '乗り物';

  /**
   * コンストラクタ (Constructor)
   * `new Vehicle(...)` のようにインスタンスが作成されるときに自動的に呼び出される特別なメソッドです。
   * インスタンスが持つプロパティの初期化を行います。
   * @param {string} name - 乗り物の名前
   * @param {number} speed - 乗り物の速度 (km/h)
   */
  constructor(name, speed) {
    // `this` は、これから作成される新しいインスタンスを指します。
    // インスタンスのプロパティとして `name` と `speed` を設定します。
    this.name = name;
    this.speed = speed;

    console.log(`[Vehicle] ${this.name}が作成されました。`);
  }

  /**
   * メソッド (Method)
   * インスタンスが持つ「振る舞い」や「操作」を定義します。
   * このインスタンスを動かすメソッドです。
   */
  move() {
    const message = `[Vehicle] ${this.name}が時速${this.speed}kmで移動しています。`;
    console.log(message);
    return message;
  }

  /**
   * 情報を取得するメソッド
   * @returns {string} このインスタンスの情報をまとめた文字列
   */
  getInfo() {
    return `--- 情報 ---\n名前: ${this.name}\n速度: ${this.speed}km/h\n種類: ${Vehicle.VEHICLE_TYPE}`;
  }

  /**
   * 静的メソッド (Static Method)
   * クラス自身に属するメソッドです。インスタンスを作成せずに呼び出せます。
   * 特定のインスタンスの状態に依存しない、汎用的な処理を定義するのに便利です。
   * @param {Vehicle} vehicleA - 比較対象の乗り物インスタンスA
   * @param {Vehicle} vehicleB - 比較対象の乗り物インスタンスB
   * @returns {string} 比較結果のメッセージ
   */
  static compareSpeed(vehicleA, vehicleB) {
    if (vehicleA.speed > vehicleB.speed) {
      return `${vehicleA.name} の方が速いです。`;
    } else if (vehicleA.speed < vehicleB.speed) {
      return `${vehicleB.name} の方が速いです。`;
    } else {
      return '2台の速度は同じです。';
    }
  }
}


/**
 * =================================================================
 * 子クラス (Subclass) の定義
 * =================================================================
 * `Vehicle` クラスを継承して、より具体的な `Car` クラスを定義します。
 * `extends` キーワードを使うことで、`Vehicle` の機能を引き継ぎます。
 */
class Car extends Vehicle {
  /**
   * コンストラクタ (Constructor)
   * Carクラス独自のプロパティ `fuel` を追加します。
   * @param {string} name - 車の名前
   * @param {number} speed - 車の速度 (km/h)
   * @param {number} fuel - 車の燃料 (L)
   */
  constructor(name, speed, fuel) {
    // `super()` は親クラス(Vehicle)のコンストラクタを呼び出します。
    // 子クラスでコンストラクタを定義する場合、`this` を使う前に必ず `super()` を呼び出す必要があります。
    // これにより、親クラスの初期化処理（nameとspeedの設定）が行われます。
    super(name, speed);

    // Carクラス独自のプロパティを初期化します。
    this.fuel = fuel;

    console.log(`[Car] ${this.name}が作成されました。燃料は${this.fuel}Lです。`);
  }

  /**
   * メソッドのオーバーライド (Method Overriding)
   * 親クラス `Vehicle` にも存在する `move` メソッドを、`Car` クラス用に再定義します。
   * これを「オーバーライド」と呼びます。
   */
  move() {
    if (this.fuel > 0) {
      this.fuel -= 1; // 動くと燃料が1L減る
      // `super.move()` を使って、親クラスのオリジナルの `move` メソッドを呼び出します。
      // これにより、親クラスの機能を利用しつつ、子クラス独自の機能を追加できます。
      const parentMessage = super.move();
      const ownMessage = `\n[Car] 燃料を消費しました。残り${this.fuel}Lです。`;
      console.log(ownMessage);
      return parentMessage + ownMessage;
    } else {
      const message = `[Car] ${this.name}は燃料切れで動けません！`;
      console.log(message);
      return message;
    }
  }

  /**
   * Carクラス独自のメソッド
   * @param {number} amount - 給油する量 (L)
   */
  refuel(amount) {
    this.fuel += amount;
    const message = `[Car] ${this.name}に${amount}L給油しました。現在の燃料は${this.fuel}Lです。`;
    console.log(message);
    return message;
  }

  /**
   * 親クラスのメソッドもそのまま使えますが、
   * こちらもオーバーライドして燃料情報を追加することもできます。
   */
  getInfo() {
    // `super.getInfo()`で親クラスの情報を取得し、それに子クラスの情報を追加します。
    const parentInfo = super.getInfo();
    return `${parentInfo}\n燃料: ${this.fuel}L`;
  }
}


/**
 * =================================================================
 * DOM操作とイベントリスナー
 * =================================================================
 * HTMLの要素を操作し、ボタンがクリックされたときの処理を定義します。
 */

// グローバルスコープでインスタンスを保持する変数を宣言
let myVehicle = null;
let myCar = null;

// HTMLの要素を取得
const outputDiv = document.getElementById('output');
const btnCreateVehicle = document.getElementById('btn-create-vehicle');
const btnVehicleMove = document.getElementById('btn-vehicle-move');
const btnCreateCar = document.getElementById('btn-create-car');
const btnCarMove = document.getElementById('btn-car-move');
const btnCarRefuel = document.getElementById('btn-car-refuel');
const btnStaticMethod = document.getElementById('btn-static-method');
const btnClear = document.getElementById('btn-clear');

// 結果を画面に出力するヘルパー関数
function printOutput(message) {
  outputDiv.innerHTML = ''; // 一旦中身をクリア
  const p = document.createElement('p');
  p.textContent = message;
  outputDiv.appendChild(p);
}

// 1. Vehicleインスタンス作成ボタン
btnCreateVehicle.addEventListener('click', () => {
  // Vehicleクラスのインスタンスを作成
  myVehicle = new Vehicle('普通の乗り物', 60);
  printOutput(myVehicle.getInfo());
});

// 2. Vehicleを動かすボタン
btnVehicleMove.addEventListener('click', () => {
  if (myVehicle) {
    const message = myVehicle.move();
    printOutput(message);
  } else {
    printOutput('先に「1. Vehicleインスタンス作成」ボタンを押してください。');
  }
});

// 3. Carインスタンス作成ボタン
btnCreateCar.addEventListener('click', () => {
  // Carクラスのインスタンスを作成
  myCar = new Car('マイカー', 120, 10); // 名前、速度、初期燃料
  printOutput(myCar.getInfo());
});

// 4. Carを動かすボタン
btnCarMove.addEventListener('click', () => {
  if (myCar) {
    const message = myCar.move();
    printOutput(`${message}\n\n${myCar.getInfo()}`);
  } else {
    printOutput('先に「3. Carインスタンス作成」ボタンを押してください。');
  }
});

// 5. Carに給油するボタン
btnCarRefuel.addEventListener('click', () => {
  if (myCar) {
    const message = myCar.refuel(20); // 20L給油
    printOutput(`${message}\n\n${myCar.getInfo()}`);
  } else {
    printOutput('先に「3. Carインスタンス作成」ボタンを押してください。');
  }
});

// 6. 静的メソッドの実行ボタン
btnStaticMethod.addEventListener('click', () => {
  if (myVehicle && myCar) {
    // インスタンスではなく、クラス名から直接静的メソッドを呼び出す
    const result = Vehicle.compareSpeed(myVehicle, myCar);
    printOutput(`静的メソッドの実行結果:\n${result}`);
  } else {
    printOutput('VehicleとCarの両方のインスタンスを作成してから実行してください。');
  }
});

// 結果をクリアするボタン
btnClear.addEventListener('click', () => {
  outputDiv.innerHTML = '<p>操作パネルのボタンを押してください。</p>';
  myVehicle = null;
  myCar = null;
  console.clear();
  console.log('結果がクリアされました。');
});
