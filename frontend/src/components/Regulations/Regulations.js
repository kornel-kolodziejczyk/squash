import React from "react";

// Classes
import classes from "./Regulations.module.css";

// Components
import Card from "../_layout/Card/Card";
import Header from "../_UI/Header/Header";

const Regulations = () => (
  <Card>
    <div className={classes.regulations}>
      <Header>Regulamin Chełmskiej Ligi Squasha</Header>
      <ol>
        <li className={classes.regulations__listItem}>Organizatorem Chełmskiej Ligi Squasha są Rady Osiedla "Cementownia" i XXX-Lecia.</li>
        <li className={classes.regulations__listItem}>Liga squasha jest ligą otwartą i może do niej przystapić każda osoba.</li>
        <li className={classes.regulations__listItem}>W każdej rundzie zawodnicy w swoich grupach rozgrywają spotkania systemem "każdy z każdym"</li>
        <li className={classes.regulations__listItem}>Mecze rozgrywane są w oparciu o ogólne zasady gry w squasha. Mecze sędziują sami grający.</li>
        <li className={classes.regulations__listItem}>
          Mecze punktowane są następująco:
          <ul>
            <li className={[classes.regulations__listItem, classes["regulations__listItem--unordered"]].join(" ")}>3:0 - wygrany 5 punktów, przegrany 1 punkt</li>
            <li className={[classes.regulations__listItem, classes["regulations__listItem--unordered"]].join(" ")}>3:1 - wygrany 5 punktów, przegrany 2 punkty</li>
            <li className={[classes.regulations__listItem, classes["regulations__listItem--unordered"]].join(" ")}>3:2 - wygrany 5 punktów, przegrany 3 punkty</li>
          </ul>
        </li>
        <li className={classes.regulations__listItem}>Po każdej rundzie dokonana zostanie klasyfikacja zawodników w każdej z grup.</li>
        <li className={classes.regulations__listItem}>
          Po rozliczeniu każdej rundy dwóch najlepszych zawodników z grupy awansuje do grupy wyżej, zaś dwóch najsłabszych zawodników spada do grupy niższej.
        </li>
        <li className={classes.regulations__listItem}>Warunkiem uczestnictwa w lidze jest opłacenie wpisowego w kwocie 60zł.</li>
        <li className={classes.regulations__listItem}>
          Każdy z uczestników decydujący się na udział w lidze wyraża zgodę na udostępnienie i przetwarzanie danych osobowych:{" "}
          <ul>
            <li className={[classes.regulations__listItem, classes["regulations__listItem--unordered"]].join(" ")}>imię i nazwisko</li>
            <li className={[classes.regulations__listItem, classes["regulations__listItem--unordered"]].join(" ")}>numer telefonu</li>
            <li className={[classes.regulations__listItem, classes["regulations__listItem--unordered"]].join(" ")}>adres e-mail</li>
          </ul>
        </li>
        <li className={classes.regulations__listItem}>
          Zgłoszenie zawodnika do ligi jest jednoznaczne z jego oświadczeniem, że:{" "}
          <ul>
            <li className={[classes.regulations__listItem, classes["regulations__listItem--unordered"]].join(" ")}>zapoznał się i akceptuje regulamin Chełmskiej Ligi Squasha</li>
            <li className={[classes.regulations__listItem, classes["regulations__listItem--unordered"]].join(" ")}>
              sam ponosi odpowiedzialność za wyrządzoną przez niego szkodę do osób trzecich
            </li>
          </ul>
        </li>
        <li className={classes.regulations__listItem}>
          Organizator ma prawo do wykonywania zdjęc i filmów dokumentujących przebieg rozgrywek oraz innych wydarzeń związanych z ligą. Zawodnicy zgadzają się na publikowanie
          zdjęć, filmów i wyników ligi
        </li>
        <li className={classes.regulations__listItem}>Organizator zastrzega sobie możliwość wprowadzenia zmian do regulaminu w trakcie sezonu</li>
      </ol>
      <p></p>
    </div>
  </Card>
);

export default Regulations;
