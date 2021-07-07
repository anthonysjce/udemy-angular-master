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
  LEFT_ARROW,
  overWriteCharAtPosition,
  RIGHT_ARROW,
  SPECIAL_CHARACTERS,
  TAB,
} from "./mask.utils";

@Directive({
  selector: "[au-mask]",
})
export class AuMaskDirective implements OnInit {
  @Input("au-mask")
  mask = "";

  input: HTMLInputElement;
  constructor(e1: ElementRef) {
    this.input = e1.nativeElement;
  }
  ngOnInit() {
    this.input.value = this.buildPlaceHolder();
  }

  @HostListener("keydown", ["$event", "$event.keyCode"])
  onKeyDown($event: KeyboardEvent, keyCode) {
    if (keyCode !== TAB) {
      $event.preventDefault();
    }
    const key = String.fromCharCode(keyCode),
      cursorPos = this.input.selectionStart;
    const currentValue = this.input.value;
    switch (keyCode) {
      case LEFT_ARROW:
        const textBeforeCursor = this.input.value.slice(0, cursorPos);
        const leftcursorPos = findLastIndex(
          textBeforeCursor,
          (char) => !includes(SPECIAL_CHARACTERS, char)
        );
        if (leftcursorPos >= 0) {
          this.input.setSelectionRange(leftcursorPos, leftcursorPos);
        }

        return;
      case RIGHT_ARROW:
        this.handleRightArrow(cursorPos);

        return;
    }

    overWriteCharAtPosition(this.input, cursorPos, key);
    this.handleRightArrow(cursorPos);
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

  buildPlaceHolder() {
    const chars = this.mask.split("");
    return chars.reduce((result, char) => {
      return (result += includes(SPECIAL_CHARACTERS, char) ? char : "_");
    }, "");
  }
}
