import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
} from "@angular/core";
import * as includes from "lodash.includes";
import * as findLastIndex from "lodash.findlastindex";
import * as findIndex from "lodash.findindex";
import {
  BACKSPACE,
  DELETE,
  LEFT_ARROW,
  overWriteCharAtPosition,
  RIGHT_ARROW,
  SPECIAL_CHARACTERS,
  TAB,
} from "./mask.utils";
import { maskDigitValidator, neverValidator } from "./digit_validatior";

@Directive({
  selector: "[au-mask]",
})
export class AuMaskDirective implements OnInit {
  @Input("au-mask")
  mask = "";

  fullFieldSelected = false;

  input: HTMLInputElement;
  constructor(e1: ElementRef) {
    this.input = e1.nativeElement;
  }
  ngOnInit() {
    this.input.value = this.buildPlaceHolder();
  }

  @HostListener("select", ["$event"])
  onSelect($event: UIEvent) {
    this.fullFieldSelected =
      this.input.selectionStart == 0 &&
      this.input.selectionEnd === this.input.value.length;
  }

  @HostListener("keydown", ["$event", "$event.keyCode"])
  onKeyDown($event: KeyboardEvent, keyCode) {
    if ($event.metaKey || $event.ctrlKey) {
      return;
    }

    if (keyCode !== TAB) {
      $event.preventDefault();
    }
    const key = String.fromCharCode(keyCode),
      cursorPos = this.input.selectionStart;
    const currentValue = this.input.value;

    if (this.fullFieldSelected) {
      this.input.value = this.buildPlaceHolder();

      const firstPlaceholderPos = findIndex(
        this.input.value,
        (char) => char === "_"
      );

      this.input.setSelectionRange(firstPlaceholderPos, firstPlaceholderPos);
    }
    switch (keyCode) {
      case LEFT_ARROW:
        this.handleLeftArrow(cursorPos);
        return;
      case RIGHT_ARROW:
        this.handleRightArrow(cursorPos);
        return;

      case BACKSPACE:
        this.handleBackSpace(cursorPos);
        return;

      case DELETE:
        this.handleBackSpace(cursorPos);
        return;
    }
    const maskDigit = this.mask.charAt(cursorPos);
    const digitValidator = maskDigitValidator[maskDigit] || neverValidator;
    // if maskDigitValidator[maskDigit] is null then it will return neverValidator which always return false
    //this is the better approach than checking digitValidator(key) is not null like this !digitValidator(key)

    if (digitValidator(key)) {
      overWriteCharAtPosition(this.input, cursorPos, key);
      this.handleRightArrow(cursorPos);
    }
  }
  handleRightArrow(cursorPos) {
    const textAfterCursor = this.input.value.slice(cursorPos + 1);
    const rightCursorPos = findIndex(
      textAfterCursor,
      (char) => !includes(SPECIAL_CHARACTERS, char)
    );
    if (rightCursorPos >= 0) {
      const newRightcursorPos = cursorPos + rightCursorPos + 1;
      this.input.setSelectionRange(newRightcursorPos, newRightcursorPos);
    }
  }
  handleLeftArrow(cursorPos) {
    const textBeforeCursor = this.input.value.slice(0, cursorPos);
    const leftcursorPos = findLastIndex(
      textBeforeCursor,
      (char) => !includes(SPECIAL_CHARACTERS, char)
    );
    if (leftcursorPos >= 0) {
      this.input.setSelectionRange(leftcursorPos, leftcursorPos);
    }
  }
  handleBackSpace(cursorPos) {
    const textBeforeCursor = this.input.value.slice(0, cursorPos);
    const leftcursorPos = findLastIndex(
      textBeforeCursor,
      (char) => !includes(SPECIAL_CHARACTERS, char)
    );
    if (leftcursorPos >= 0) {
      overWriteCharAtPosition(this.input, leftcursorPos, "_");
      this.input.setSelectionRange(leftcursorPos, leftcursorPos);
    }
  }
  handleDelete(cursorPos) {
    overWriteCharAtPosition(this.input, cursorPos, "_");
    this.input.setSelectionRange(cursorPos, cursorPos);
  }

  buildPlaceHolder() {
    const chars = this.mask.split("");
    return chars.reduce((result, char) => {
      return (result += includes(SPECIAL_CHARACTERS, char) ? char : "_");
    }, "");
  }
}
