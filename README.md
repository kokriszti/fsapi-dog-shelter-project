# Menhely alkalmazás

Az Add A Mancsod Alapítvány elektronikus nyilvántartással szeretné gördülékenyebbé tenni kutyamenhelyük örökbefogadási folyamatát. A projektem célja egy működő alkalmazás fejlesztése, mely elősegíti, hogy a gazdára váró kutyák mielőbb szerető családra találjanak.

Az elkészítendő rendszerben a menhely dolgozói a gondozásukban álló kutyákról teljes körű nyilvántartást vezethetnek. Az érdeklődő gazdijelöltek megtekinthetik a gazdikereső kutyákat, regisztrálhatnak, az örökbefogadáshoz kérdőívet tölthetnek ki, illetve belépést követően időpontot foglalhatnak a kiválasztott kutya személyes meglátogatására. A menhely dolgozói megtekinthetik a látogatások listáját, és a gazdijelölt öröbefogadási kérdőívre adott válaszait.

# Entitások

## User

**Admin jogosultsággal rendelkező felhasználó** a menhely dolgozója. Lehetősége van új kutyát a nyilvántartásba beregisztrálni, meglévő kutya adatait megtekinteni, módosítani, a kutyát örökbeadni, valamint a nyilvántartásból törölni. Megtekintheti a lefoglalt látogatások listáját, valamint a látogatóba érkező gazdijelöltek öröbefogadási kérdőívre adott válaszait.

**Admin jogosultsággal nem rendelkező felhasználó** az örökbefogadás iránt érdeklődő gazdijelölt. Regisztráció során örökbefogadási kérdőívet tölthet ki, belépés után személyes látogatásra időpontot foglalhat. Saját profil oldalán megtekintheti és módosíthatja a kérdőívre adott válaszait, valamint megtekintheti és törölheti lefoglalt időpontját. 

## Dog

A menhely által nyilvántartott kutya. Státusza szerint lehet gazdikereső vagy gazdis. Gazdis kutya esetén itt tároljuk az örökbefogadó adatait is. 

## Appointment

Lefoglalt látogatás, amelyben tároljuk a látogatás dátumát és időpontját, a meglátogatandó kutya, és a látogatásra érkező gazdijelölt azonosítóját, opcionálisan a gazdijelölt megjegyzését.

# User story lista, feladatok

A felhasználó regisztrál és belép az alkalmazásba

- Regisztrációs képernyő megvalósítása
- API regisztrációs végpont implementálása (POST /user)
- Login képernyő megvalósítása
- API login végpont implementálása (POST /login)
- JWT autentikáció implementáció, kliens oldali hozzáférés szabályozása autentikáció alapján

A felhasználó megtekinti a gazdikereső kutyákat

- Kutya lista képernyő implementálása
- GET /dog végpont implementálása az örökbefogadható kutyák lekérdezéséhez
- Kutya részletek képernyő implementálása
- GET /dog/:id végpont implementálása kutya részleteinek lekérdezéséhez

A felhasználó időpontot foglal

- Időpontfoglalás képernyő implementálása
- POST /appointment végpont implementálása az időpont lefoglalásához

A felhasználó megtekinti a profilját

- Felhasználói adatok képernyő implementálása
- GET /user/:id végpont implementálása felhasználó adatainak lekérdezéséhez
- PATCH /user/:id végpont implementálása felhasználó jelszavának módosításához
- PUT /user/:id végpont implementálása felhasználó adatainak módosításához
- GET /appointment végpont implementálása felhasználó időpontjának lekérdezéséhez
- DELETE /appointment/:id végpont implementálása felhasználó időpontjának törléséhez

Admin megtekinti és kezeli a nyilvántartott kutyákat 
- Kutya lista képernyő implementálása
- POST /dog végpont implementálása kutya létrehozásához
- DELETE /dog/:id végpont implementálása kutya törléséhez
- Kutya részletek képernyő implementálása
- PUT /dog/:id végpont implementálása kutya adatainak szerkesztéséhez
- PATCH /dog/:id végpont implementálása kutya örökbe adásához

Admin megtekinti a lefoglalt időpontokat
- Időpont lista képernyő implementálása

# Képernyők

## Public modul képernyői
*Bejelentkezés nélkül elérhető képernyők:*

### Kezdőlap

Áttekintő oldal, melyen a felhasználó átfogó információhoz juthat a menhellyel kapcsolatban.

### Gazdikereső kutyák

A felhasználó kártyás formában megtekintheti az aktuális gazdikeresők listáját, preferenciája szerinti szűrőfeltételeket állíthat be. A kiszemelet kutya Részletek gombjára kattintva a **Kutya adatlap** képernyőre jutunk.  

### Kutya adatlap

A felhasználó megtekintheti a kiválasztott kutya részletes adatait. Az Időpontfoglalás gombra kattintva az **Időpontfoglalás** képernyőre jutunk, amely csak bejelentkezés után érhető el.

### Regisztráció

A felhasználó létrehozhatja a felhasználói fiókját, felhasználónév és jelszó megadásával, valamint az örökbefogadási kérdőív kitöltésével.

### Login

A felhasználó bejelentkezhet felhasználónév és jelszó megadásával.

*Bejelentkezést követően elérhető képernyők:*

### Időpontfoglalás

A felhasználó kiválaszthatja látogatása dátumát és időpontját, megjegyzést írhat, és a foglalást véglegesítheti.

### User profil

A felhasználó megváltoztathatja a jelszavát, megtekintheti és módosíthatja az örökbefogadási kérdőívre adott válaszait, valamint megtekintheti és törölheti lefoglalt időpontját.

## Admin modul képernyői

*Az admin modul képernyői csak admin jogosultságú felhasználó számára, bejelentkezést követően érhetők el.*

### Kutyák listája

A felhasználó táblázatos formában megtekintheti a nyilvántartásban szereplő kutyák listáját. A Kutya-plusz ikonra kattintva az **Új kutya létrehozása/Kutya szerkesztése** képernyőre jutunk. Az egyes kutyákhoz tartozó Nagyító ikonra kattintva a **Kutya adatlap** képernyőre jutunk. Az egyes kutyákhoz tartozó Kuka ikonra kattintva a felhasználó törölheti a nyilvántarásból az adott kutyát.

### Kutya adatlap

A felhasználó megtekintheti a kiválasztott kutya adatait. Az Örökbeadás gombra kattintva a felhasználó rögzítheti az örökbefogadás adatait, majd véglegesítheti az örökbeadást. Az Adatok szerkesztése gombra kattintva az **Új kutya létrehozása/Kutya szerkesztése** képernyőre jutunk.

### Új kutya létrehozása/Kutya szerkesztése

A felhasználó az adatlapon berögzítheti az új kutya adatait, vagy meglévő kutya esetén az előre betöltött adatokat módosíthatja.

### Látogatások listája

A felhasználó táblázatos formában megtekintheti a lefoglalt látogatások listáját, akutális naptól kezdődően, dátum szerint rendezve. Az egyes sorokon a kutya nevére kattintva az **Kutya adatlap** képernyőre jutunk. A látogató neve melletti információs ikonra kattintva az **Információ a gazdijelöltről** képernyőre jutunk.

### Információ a gazdijelöltről

A felhasználó megtekintheti a látogatásra érkező gazdijelölt örökbefogadási kérdőívre adott válaszait. 



# API végpontok

- POST /login – felhasználó bejelentkezés
- POST /refresh – felhasználó bejelentkezésének megújítása
- POST /logout – felhasználó kilépés
- POST /user – felhasználói regisztráció
- GET /user/:id - felhasználó adatainak lekérése
- PATCH /user/:id - felhasználó jelszavának módosítása
- PUT /user/:id - felhasználó adatainak módosítása
- GET /dog – nyilvántartott kutyák lekérdezése
- GET /dog/:id – kutya adatainak lekérdezése
- POST /dog – új kutya létrehozása
- PUT /dog/:id - kutya adatainak módosítása
- PATCH /dog/:id - kutya örökbeadása
- DELETE /dog/:id - kutya törlése
- GET /appointment – lefoglalt látogatások lekérdezése
- GET /appointment/:id – látogatás adatainak lekérdezése
- POST /appointment – új látogatás létrehozása
- DELETE /appointment/:id – látogatás törlése

# Adatstruktúra

## Dog
- _id
- status (adoptable, adopted)
- name
- gender
- size
- dateOfBirth
- description
- imgSrc
- isVaccinated
- isSterilized
- kennelNr
- activity?
- toChild?
- toFlat?
- appointments?
- owner? (beágyazott objektum)

### Owner (Dog beágyazott objektuma)
- ownerLastName
- ownerFirstName
- ownerEmail
- ownerTel
- ownerAddress:
  - zip
  - city
  - streetAndNr
- dateOfAdoption

## User
- _id
- username
- password
- isAdmin
- adoptionForm (beágyazott objektum)

### AdoptionForm (User beágyazott objektuma)
- lastName
- firstName
- phone
- email
- age
- nrOfPplInHousehold
- childrenInHousehold
- ageOfYoungestChild?
- typeOfHouse
- otherDog
- otherPet
- otherPetDetails?
- nrOfHoursAlone
- nrOfDailyWalks
- wantedSizeSmall
- wantedSizeMedium
- wantedSizeBig
- wantedAgePuppy
- wantedAgeYoung
- wantedAgeAdult
- wantedAgeOld
- introduction

## Appointment
- _id
- dog
- user
- date
- time
- comment?

# Az alkalmazás futtatása

```
cd dog-shelter-backend
```

```
npm run docker:compose
```
# Teszt adatok bejelentkezéshez

*Admin jogosultsággal rendelkező felhasználó:*

```
Felhasználónév: admin
Jelszó: admin
```

*Admin jogosultsággal nem rendelkező felhasználó:*

```
Felhasználónév: user
Jelszó: user
```


# Tesztek futtatása

```
cd dog-shelter-backend
```

```
npm i
```

```
npm run test
```

# Swagger dokumentáció

```
http://localhost:3000/api/api-docs/
```
