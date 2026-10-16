import "./estilos/styles.css";
import "./estilos/calculadoraApp.css";
import { Calculadora } from "../calculadora";

export class CalculadoraApp {
  private readonly container: HTMLDivElement;
  private readonly addButton: HTMLButtonElement;

  constructor(containerSelector: string, addButtonSelector: string) {
    const container = document.querySelector<HTMLDivElement>(containerSelector);
    const addButton = document.querySelector<HTMLButtonElement>(addButtonSelector);

    if (!container || !addButton) {
      throw new Error(
        `No se encontró ${containerSelector} o ${addButtonSelector} en el HTML`,
      );
    }

    this.container = container;
    this.addButton = addButton;

    // Al pulsar el botón se crea una calculadora nueva
    this.addButton.addEventListener("click", () => this.addCalculator());

    // Calculadora inicial
    this.addCalculator();
  }

  private addCalculator(): void {
    const calculadora = new Calculadora();
    this.container.appendChild(calculadora.getElement());
  }
}