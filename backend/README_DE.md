# Image Board
​
## Backend
​
1. Richten Sie einen Node.js-Server mit einem Framework wie Express ein und stellen Sie eine Verbindung zu einer MongoDB-Datenbank her.
​
2. Erstellen Sie eine Route für die Registrierung neuer Benutzer. Stellen Sie sicher, dass die Passwörter gehasht und gesalzen werden, bevor sie in der Datenbank gespeichert werden.
​
3. Erlauben Sie den Benutzern, Profilbilder hochzuladen, wobei Sie die Dateitypen auf Bilder und Gifs beschränken (keine Videodateien usw.). Verwenden Sie ein Paket wie Multer, um Datei-Uploads zu verwalten und die Bilder in einer Cloud zu speichern.
​
4. Erstellen Sie eine Route für Benutzerbeiträge und stellen Sie eine Beziehung zu den Benutzern her, indem Sie die Beiträge entweder unter dem Benutzerobjekt verschachteln oder eindeutige Identifikatoren wie Benutzer-IDs verwenden.
​
5. Beiträge sollten einen Titel, eine Beschreibung und optional Bild- oder Videoanhänge haben. Verwenden Sie ein Paket wie Cloudinary, um Bild- und Video-Uploads zu verarbeiten, und speichern Sie die resultierenden URLs in der Datenbank. Erlauben Sie den Benutzern, Beiträge zu kommentieren und zu mögen.
​
6. Erlauben Sie Benutzern, ihr Profil zu bearbeiten. Ändern Sie ihren Namen, Spitznamen und ihr Profilbild (Hinweis: nur ein Profilbild, daher muss es neu geschrieben werden)
​
## Frontend
​
```
Das Frontend ist nicht deine Priorität, verbringe nicht zu viel Zeit damit und konzentriere dich mehr auf das Backend. Kurz gesagt, es muss nicht hübsch oder ansprechend sein.
```
​
1. Verwenden Sie React, um ein Frontend-Interface für Ihr Image Board zu erstellen.
​
2. Erlauben Sie den Nutzern, sich für neue Konten zu registrieren und sich in bestehende Konten einzuloggen.
​
3. Erlauben Sie den Nutzern, neue Beiträge zu erstellen, einschließlich Titel, Beschreibungen und Bild- oder Videoanhängen.
​
4. Anzeige von Beiträgen in einem Feed, zusammen mit ihren Titeln, Beschreibungen und Bild- oder Videoanhängen.
​
5. Nutzern die Möglichkeit geben, Beiträge zu kommentieren und zu liken und die Beitragsinformationen in Echtzeit zu aktualisieren.
​
### Zusätzliche **Muss**
​
1. Implementierung von Authentifizierung und Autorisierung für Benutzeraktionen wie das Erstellen, Bearbeiten und Löschen von Beiträgen.
​
2. Erlauben Sie Benutzern, anderen Benutzern zu folgen, und zeigen Sie einen Feed mit Beiträgen der Benutzer an, denen sie folgen.
​
3. Implementieren Sie eine Suchfunktion, die es Benutzern ermöglicht, nach Beiträgen anhand von Schlüsselwörtern oder Tags zu suchen.
​
### Bonus-Herausforderungen **optional**
​
1. Implementieren Sie Echtzeit-Updates mit WebSockets(socket.io), um neue Beiträge und Kommentare in Echtzeit anzuzeigen, ohne die Seite aktualisieren zu müssen.
​
2. Implementieren Sie eine Empfehlungsmaschine, um Nutzern auf der Grundlage ihrer bisherigen Aktivitäten und Interessen Beiträge vorzuschlagen.
  * Durch die Implementierung einer Empfehlungsmaschine können Sie den Nutzern Beiträge auf der Grundlage ihrer früheren Aktivitäten und Interessen vorschlagen. Wenn ein Nutzer zum Beispiel zuvor Beiträge zum Thema Fotografie geliked oder kommentiert hat, kann die Empfehlungsmaschine ähnliche Beiträge vorschlagen, die für diesen Nutzer wahrscheinlich von Interesse sind. Dies kann mit Hilfe von Algorithmen des maschinellen Lernens oder durch die Analyse von Daten zum Nutzerverhalten geschehen. Das Ziel ist es, die Nutzerbindung zu verbessern, indem relevante Inhalte vorgeschlagen werden und die Wahrscheinlichkeit erhöht wird, dass die Nutzer auf die Website zurückkehren.
​
3. Ermöglichen Sie es den Nutzern, Gruppen auf der Grundlage ihrer Interessen zu erstellen und ihnen beizutreten, und zeigen Sie einen Feed mit Beiträgen von Mitgliedern ihrer Gruppe an.
​
4. Implementierung einer Funktion, die es den Nutzern ermöglicht, Beiträge zu speichern und mit einem Lesezeichen zu versehen, um sie später anzusehen.
​
5. Implementierung einer Paginierung, um die Leistung zu verbessern, wenn eine große Anzahl von Beiträgen angezeigt wird.
