import { moveItemInArray } from "@angular/cdk/drag-drop";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnInit,
} from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { distinct, map, tap } from "rxjs/Operators";
import { User } from "src/app/Interfaces/interfaces.interface";
import { UsersService } from "src/app/services/users.service";
@Component({
  selector: "app-offers",
  templateUrl: "./offers.component.html",
  styleUrls: ["./offers.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OffersComponent implements OnInit {
  // showing form
  register = false;
  registered = false;
  // toggleDec
  deliveryDec = true;
  // register form
  newClient: FormGroup;
  // canDeactivate
  isDirty = true;
  // autoPaly Video
  play: boolean;
  // window width
  winWidth;
  users: User[];

  // well use it directly in HTML as async Pipe
  allUsers$ = this.userService.getUsers$;
  // scroll to an element
  scrollToElement($element): void {
    this.userService.getUsers$
      .pipe(map((users) => this.uniqueUsers(users)))
      .subscribe((users) => {
        this.users = users;
        console.log(users);
      });
    setTimeout(() => {
      $element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    }, 200);
    this.register = true;
  }
  // listen to window
  @HostListener("window:resize", ["$event"])
  getScreenSize(event?) {
    // this.winHeight = window.innerHeight;
    this.winWidth = window.innerWidth;
    this.winWidth >= 1000 ? (this.play = true) : (this.play = false);
  }
  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this._newClient();
    this.getScreenSize();
  }

  ngOnInit(): void {}

  cancel(): void {
    this.toastr.warning(
      "???????? ???????????? ???????? ?????? ???????????? ????????????????",
      " ?????????? ?????????????? ?????? ???????? ???????????????? ???????? ?? ?????? ???????? "
    );
    this.newClient.reset();
    this.isDirty = false;
    setTimeout(() => {
      this.router.navigate(["/welcome"]);
    }, 2000);
  }

  postNew(client: User): void {
    this.userService.createUser(client).subscribe((res: any) => {
      if (res.state === true) {
        this.toastr.success(
          "???????? ???????????? ???????? ?????? ???????????? ????????????????",
          " ???? ?????????????? ?????????? ???????? ?????????? ???? ?????????? ???????????? "
        );
        this.register = false;
        this.registered = true;
        this.isDirty = false;
        setTimeout(() => {
          this.router.navigate(["/welcome"]);
        }, 2000);
      } else if (res.state === false) {
        this.toastr.error(" ?????? ?????? ?????????? ?????????????? ");
      }
    });
  }

  private uniqueUsers(users) {
    const uniUser: User = {};
    const newUsers: User[] = [];
    // tslint:disable-next-line: forin
    for (const i in users) {
      // tslint:disable-next-line: no-string-literal
      const userName = users[i]["name"];
      uniUser[userName] = users[i];
    }
    // tslint:disable-next-line: forin
    for (const i in uniUser) {
      newUsers.push(uniUser[i]);
    }
    return newUsers;
  }

  // isPhoneNumberDuplicated() {
  //   const phone = this.newClient.get("phone").value;
  //   return !!this.users.find((user) => user.phone === phone);
  // }

  get nameError(): string {
    const name = this.newClient.get("name");
    if (!name) {
      return "";
    }

    return name.hasError("required")
      ? "???? ???????? ???????? ??????????"
      : name.hasError("isNameDuplicated")
      ? "?????? ?????????? ???????? ?????????? ????????????"
      : "?????? ?????????? ???????????? ?????????? ??????????????";
  }

  get phoneError(): string {
    const phone = this.newClient.get("phone");

    if (!phone) {
      return "";
    }

    return phone.hasError("required")
      ? "???? ???????? ???????? ?????? ????????????"
      : phone.hasError("pattern")
      ? "???????? ???? ???????? ???????????????? ???????????? 010 ??012 ??015 ??011 ?????????? ???????? ???? 11 ??????"
      : phone.hasError("isPhoneNumberDuplicated")
      ? "?????? ?????????? ???????? ????????????...?????????? ?????????????? ???????? ??????."
      : "?????????? ???????? ???????????????? ?????? ????????????";
  }

  private _newClient(): void {
    const patternTextOnly =
      "^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z ]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z-_]*$";
    const patternNumberOnly = /^01[0125][0-9]{8}$/;
    this.newClient = this.fb.group({
      name: ["", [Validators.required, this.isNameDuplicated]],
      phone: [
        "",
        [
          Validators.required,
          Validators.pattern(patternNumberOnly),
          this.isPhoneNumberDuplicated,
        ],
      ],
      address: ["", Validators.required],
    });
  }

  // custom validator
  isPhoneNumberDuplicated: ValidatorFn = (
    control: AbstractControl
  ): { [key: string]: boolean } | null => {
    if (control.value) {
      return this.users.find((user) => user.phone === control.value)
        ? { isPhoneNumberDuplicated: true }
        : null;
    }
    return null;
  };

  isNameDuplicated: ValidatorFn = (
    control: AbstractControl
  ): { [key: string]: boolean } | null => {
    if (control.value) {
      return this.users.find((user) => user.name === control.value)
        ? { isNameDuplicated: true }
        : null;
    }
    return null;
  };
}
