export class CalculadoraModel {
  private currentInput = "";
  private previousInput = "";
  private operation = "";
  private waitingForNewNumber = false;
  private display = "0";

  getDisplay(): string {
    return this.display;
  }

  inputNumber(value: string): void {
    if (this.currentInput === "" && value === ".") {
      this.currentInput = "0.";
      this.display = this.currentInput;
      return;
    }

    if (this.currentInput === "0" && value === "0") return;
    if (value === "." && this.currentInput.includes(".")) return;

    if (this.waitingForNewNumber) {
      this.currentInput = value === "." ? "0." : value;
      this.waitingForNewNumber = false;
    } else {
      this.currentInput += value;
    }

    this.display = this.currentInput;
  }

  setOperation(operation: string): void {
    this.previousInput = this.currentInput === "" ? "0" : this.currentInput;
    this.waitingForNewNumber = true;
    this.operation = operation;
  }

  //Operacion con los signos
  calculate(): void {
    const previousNumber = Number(this.previousInput);
    const currentNumber = Number(this.currentInput);
    let result: number;

    switch (this.operation) {
      case "+":
        result = previousNumber + currentNumber;
        break;
      case "-":
        result = previousNumber - currentNumber;
        break;
      case "*":
        result = previousNumber * currentNumber;
        break;
      case "/":
        if (currentNumber === 0) {
          this.setError();
          return;
        }
        result = previousNumber / currentNumber;
        break;
      default:
        return;
    }

    this.currentInput = Number(result.toFixed(2)).toString();
    this.display = this.currentInput;
    this.waitingForNewNumber = true;
  }

  //Operacion de borrar
  clear(): void {
    this.currentInput = "";
    this.previousInput = "";
    this.operation = "";
    this.waitingForNewNumber = false;
    this.display = "0";
  }

  //Operacion de borrar
  delete(): void {
    this.currentInput = this.currentInput.slice(0, -1);
    this.display = this.currentInput === "" ? "0" : this.currentInput;
  }

  //Operacion de porcentaje
  percent(): void {
    this.currentInput = (Number(this.currentInput) / 100).toString();
    this.display = this.currentInput;
  }

  private setError(): void {
    this.display = "Error";
    this.currentInput = "";
    this.previousInput = "";
    this.operation = "";
    this.waitingForNewNumber = true;
  }
}