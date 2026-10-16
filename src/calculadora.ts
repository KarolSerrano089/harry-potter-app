import "./estilos/calculadora.css";
import { CalculadoraModel } from "../calculadoraModel";

export class Calculadora {
  private readonly model = new CalculadoraModel();
  private readonly element: HTMLDivElement;
  private readonly screen: HTMLDivElement;

  constructor() {
    this.element = this.createElement();
    this.screen = this.element.querySelector(".screen") as HTMLDivElement;

    this.bindNumbers();
    this.bindOperations();
    this.bindActions();
    this.render();
  }

  getElement(): HTMLDivElement {
    return this.element;
  }

  // Crea lo que contiene la calculadora 
  private createElement(): HTMLDivElement {
    const calculator = document.createElement("div");
    calculator.classList.add("calculator");

    calculator.innerHTML = `
      <div class="screen">0</div>

      <div class="buttons">
        <button data-action="clear">C</button>
        <button data-action="delete">DEL</button>
        <button data-action="percent">%</button>
        <button data-operation="/">÷</button>

        <button data-number="7">7</button>
        <button data-number="8">8</button>
        <button data-number="9">9</button>
        <button data-operation="*">x</button>

        <button data-number="4">4</button>
        <button data-number="5">5</button>
        <button data-number="6">6</button>
        <button data-operation="-">-</button>

        <button data-number="1">1</button>
        <button data-number="2">2</button>
        <button data-number="3">3</button>
        <button data-operation="+">+</button>

        <button data-number="0">0</button>
        <button data-number=".">.</button>
        <button data-action="calculate">=</button>
      </div>
    `;

    return calculator;
  }

  // Enlaza los numeros para guardar el anterior
  private bindNumbers(): void {
    const buttons = this.element.querySelectorAll<HTMLButtonElement>("[data-number]");

    for (const button of buttons) {
      button.addEventListener("click", () => {
        const value = button.dataset.number;
        if (value === undefined) return;

        this.model.inputNumber(value);
        this.render();
      });
    }
  }

  // Enlaza las opraciones para hacer operaciones seguidas
  private bindOperations(): void {
    const buttons = this.element.querySelectorAll<HTMLButtonElement>("[data-operation]");

    for (const button of buttons) {
      button.addEventListener("click", () => {
        this.model.setOperation(button.dataset.operation ?? "");
      });
    }
  }

  //Botones de las operaciones
  private bindActions(): void {
    const buttons = this.element.querySelectorAll<HTMLButtonElement>("[data-action]");

    for (const button of buttons) {
      button.addEventListener("click", () => {
        switch (button.dataset.action) {
          case "calculate":
            this.model.calculate();
            break;
          case "clear":
            this.model.clear();
            break;
          case "delete":
            this.model.delete();
            break;
          case "percent":
            this.model.percent();
            break;
          default:
            return;
        }
        this.render();
      });
    }
  }

  private render(): void {
    this.screen.textContent = this.model.getDisplay();
  }
}