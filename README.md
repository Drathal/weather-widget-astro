# Astro + Solid.js Weather Widget

## Einleitung

Wie eine Nutzerstudie 2002 herausgefunden hat, wollen Besucher von Webseiten am liebsten gleich alle Informationen wie Nachrichten, Börsenkurse oder das örtliche Wetter an einem Ort vorfinden, um dann eine Webseite zur Homepage zu machen um von hier aus den Besuch im Web zu starten. 20 Jahre später ist ZEIT ONLINE im Nachrichtenbereich endlich so weit, dass auch die anderen Elemente auf der Homepage angeboten werden sollen. Wir beginnen mit einem niedlichen kleinen Wetter-Widget, direkt im Kopf der Seite…

## Arbeitsmittel

- Nutze für die folgende Aufgabe das API von [Open Weather Map](https://openweathermap.org/current) mit diesem API-Key: `xxxxxxxxxxxxxxx`, oder einem selbst erzeugten. Nutze Version des API 2.5 und nicht die neueste 3.0.
- Code diese Aufgabe wahlweise in [Codepen](https://codepen.io), oder in deinem eigenen, dir am besten passenden Environment und Sprache/Framework. Lass uns den Code rechtzeitig vor dem Termin zukommen (Codepen-URL, Github-Repository, Zip-File… whatever)
- Es geht in erster Linie um das Widget. Gestalte das drumherum (bspw. den Seitenkopf) nur soweit das für die Aufgabe nötig ist.
- Die Aufgaben bauen aufeinander auf. Löse so viele, wie es dir in der gegebenen Zeit möglich ist.
- Wenn Sicherheitsabfragen, Sanitizing oder Datenprüfungen sehr aufwändig umzusetzen wären, reicht es aus, zu erwähnen, dass das Problem erkannt wurde, statt es umzusetzen (bspw. Einschränkung der möglichen Städtenamen o.ä.)

## Aufgabe 1: Wetter in Hamburg (in der Regel schlecht)

### Story

Als täglich wiederkehrender Benutzer von ZEIT ONLINE möchte ich neben aktuellen Nachrichten weitere Informationen, wie beispielsweise das Wetter an meinem Standort, abrufen können, damit ich keine anderen Webseiten für diese Information besuchen muss.

### Designbriefing

Das Widget ist klein genug, um im Header der Website angezeigt zu werden. Das Widget ist im wesentlichen zweigeteilt und soll folgende Informationen enthalten:

- linke Seite:
  - Icon, das die aktuelle Wetterlage wiederspiegelt (bspw. sonnig, bedeckt, regnerisch)
- rechte Seite:
  - die Wetterlage in schriftlicher Form
  - die Temperatur
  - der Standort, für den diese Wetterdaten gelten

### Technische Informationen

- Alle nötigen Daten kommen von diesem API.
- Für eine erste Version soll zunächst das Wetter am Standort Hamburg angezeigt werden.
- Die Gestaltung des Widgets bleibt dir überlassen.
- Das API hat eine Zugriffsbeschränkung von 20 Requests/min. Bitte nicht wundern, falls du bei häufigen Anfragen während dem Bauen mal zurückgewiesen wirst. Über das Rate-Limiting im real world Einsatz brauchst du dir keine Gedanken zu machen.

## Aufgabe 2: Das Wetter bei dir

### Story

Als Benutzer aus Berlin oder einem anderen Ort, der nicht am Wetter von Hamburg interessiert ist, möchte ich das Wetter an meinem Ort angezeigt bekommen. Ich möchte diese Information idealerweise nicht bei jedem Seitenaufruf eingeben.

### Technische Informationen

- Es sollen die Standortdaten des Browsers verwendet werden, aber mit der Möglichkeit, einen Städtenamen einzugeben, falls der Nutzer die Abfrage der Standortdaten ablehnt

## Aufgabe 3: Responsivität und Dark Mode

Seit einiger Zeit haben wir für ZEIT ONLINE einen Dark Mode. Jedes Element auf der Seite muss sich entsprechend anpassen. Bitte auch für das Wetter-Widget umsetzen.

Außerdem möchten wir gern eine responsive Anpassung des Wetter-Widgets sehen. Die Art ist dir überlassen. Ob mobil die Schrift kleiner ist als auf dem Desktop, oder ob das Widget seine Position verändert, oder was auch immer. Sei etwas kreativ mit den Devices.
