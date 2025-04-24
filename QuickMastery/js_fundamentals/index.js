function main() {
  console.log("Assignment Basic JavaScript");
  console.log("===========================");
  hitungBilanganGanjil(10);
  cekTahunKabisat(1945);
  hitungFaktorial(5);
  cekBilanganPrima(20);
  hitungJumlahDigit(19900);
  cekPalindrom("katak");
  hitungPangkat(2, 10);
  deretFibonacci(10);
  hitungJumlahKata("Lorem ipsum");
  cariBilanganTerbesar([6, 7, 8, 9, 10]);
  hitungRataRata([1, 2, 3, 4, 5]);
  hitungJumlahVokal("JaVAsCRiPT");
  cariFaktorBilangan(12);
  konversiSuhu(10, "F");
  hitungJumlahHurufUnik("Lorem ipsum dolor sit amet");
  hitungJumlahKemunculanKata(
    "Saya suka nasi, nasi sangat enak, nasi memang hebat",
    "nasi"
  );
  cariBilanganGanjilTerbesar([6, 7, 8, 9, 10]);
  hitungJumlahDigitGenap(200500);
  cekAnagram("listen", "silent");
  hitungHurufKapital("Lorem ipsum dolor sit amet");
  cariBilanganYangHilang([1, 2, 3, 4, 5, 7]);
  hitungJumlahHari("2023-01-01", "2023-01-31");
  hitungKataUnik("Lorem ipsum dolor sit amet");
  hitungBilanganYangMunculSekali([1, 1, 2, 2, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 10]);
  hitungJumlahKemunculanKarakter("Lorem ipsum dolor sit amet");
  hitungJumlahkombinasi(10, 3);
}

function hitungBilanganGanjil(n) {
  let jumlah = 0;
  for (let i = 1; i <= n; i++) {
    if (i % 2 === 1) {
      jumlah++;
    }
  }
  console.log("Bilangan ganjil sampai angka " + n + " : " + jumlah);
}

function cekTahunKabisat(year) {
  let result = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  console.log("Apakah " + year + " tahun kabisat? " + result);
}

function hitungFaktorial(n) {
  let result = 1;
  for (let i = 1; i <= n; i++) {
    result *= i;
  }
  console.log("Faktorial " + n + " : " + result);
}

function cekBilanganPrima(n) {
  const result = [];
  for (let i = 1; i <= n; i++) {
    if (i % 2 === 1) {
      result.push(i);
    }
  }
  console.log("Bilangan prima sampai angka " + n + " : " + result);
}

function hitungJumlahDigit(n) {
  const result = n.toString().length;
  console.log("Jumlah digit angka " + n + " : " + result);
}

function cekPalindrom(n) {
  const result = n.toString().split("").reverse().join("");
  console.log(
    "Apakah " + "'" + n + "'" + " palindrom? " + (result === n.toString())
  );
}

function hitungPangkat(a, b) {
  const result = a ** b;
  console.log(a + " pangkat " + b + " : " + result);
}

function deretFibonacci(n) {
  const result = [];
  for (let i = 0; i < n; i++) {
    if (i === 0) {
      result.push(0);
    } else if (i === 1) {
      result.push(1);
    } else {
      result.push(result[i - 1] + result[i - 2]);
    }
  }
  console.log("Deret Fibonacci sampai angka " + n + " : " + result);
}

function hitungJumlahKata(kalimat) {
  const result = kalimat.split(" ").length;
  console.log("Jumlah kata di kalimat " + "'" + kalimat + "'" + " : " + result);
}

function hitungRataRata(n) {
  const result = n.reduce((a, b) => a + b, 0) / n.length;
  console.log("Rata-rata angka " + n + " : " + result);
}

function cariBilanganTerbesar(n) {
  let result = n[0];
  for (let i = 1; i < n.length; i++) {
    if (n[i] > result) {
      result = n[i];
    }
  }
  console.log("Bilangan terbesar di array " + n + " : " + result);
}

function hitungJumlahVokal(kalimat) {
  const result = kalimat.toLowerCase().match(/[aeiou]/g).length;
  console.log(
    "Jumlah vokal di kalimat " + "'" + kalimat + "'" + " : " + result
  );
}

function cariFaktorBilangan(n) {
  const result = [];
  for (let i = 1; i <= n; i++) {
    if (n % i === 0) {
      result.push(i);
    }
  }
  console.log("Faktor bilangan " + n + " : " + result);
}

function konversiSuhu(suhu, jenis) {
  switch (jenis) {
    case "C":
      console.log(suhu + " Celcius = " + (suhu * (9 / 5) + 32) + " Fahrenheit");
      break;
    case "F":
      console.log(suhu + " Fahrenheit = " + ((suhu - 32) * 5) / 9 + " Celcius");
      break;
    default:
      console.log("Jenis suhu tidak valid");
  }
}

function hitungJumlahHurufUnik(kalimat) {
  const seen = new Set();
  for (const char of kalimat.toLowerCase()) {
    seen.add(char);
  }
  const result = seen.size;
  console.log(
    "Jumlah huruf unik di kalimat " + "'" + kalimat + "'" + " : " + result
  );
}

function hitungJumlahKemunculanKata(kalimat, kata) {
  const words = kalimat
    .toLowerCase()
    .replace(/[^\w\s]/gi, "")
    .split(" ");
  const result = words.filter((word) => word === kata).length;
  console.log(
    "Jumlah kemunculan kata " +
      "'" +
      kata +
      "'" +
      " di kalimat " +
      "'" +
      kalimat +
      "'" +
      " : " +
      result
  );
}

function cariBilanganGanjilTerbesar(n) {
  let result = 0;
  for (const element of n) {
    if (element % 2 === 1 && element > result) {
      result = element;
    }
  }
  console.log("Bilangan ganjil terbesar di array " + n + " : " + result);
}

function hitungJumlahDigitGenap(n) {
  const result = n
    .toString()
    .split("")
    .filter((digit) => digit % 2 === 0).length;
  console.log("Jumlah digit genap di angka " + n + " : " + result);
}

function cekAnagram(kata1, kata2) {
  const sortedKata1 = kata1.toLowerCase().split("").sort().join("");
  const sortedKata2 = kata2.toLowerCase().split("").sort().join("");
  const result = sortedKata1 === sortedKata2;
  console.log(
    "Apakah " +
      "'" +
      kata1 +
      "'" +
      " dan " +
      "'" +
      kata2 +
      "'" +
      " anagram? " +
      result
  );
}

function hitungHurufKapital(kalimat) {
  const result = kalimat.match(/[A-Z]/g).length;
  console.log(
    "Jumlah huruf kapital di kalimat " + "'" + kalimat + "'" + " : " + result
  );
}

function cariBilanganYangHilang(n) {
  const result = [];
  for (let i = 1; i < Math.max(...n); i++) {
    if (!n.includes(i)) {
      result.push(i);
    }
  }
  console.log("Bilangan yang hilang di array " + n + " : " + result);
}

function hitungJumlahHari(tanggal1, tanggal2) {
  const date1 = new Date(tanggal1);
  const date2 = new Date(tanggal2);
  const result = Math.abs(date2 - date1) / 86400000;
  console.log(
    "Jumlah hari antara tanggal " +
      tanggal1 +
      " dan " +
      tanggal2 +
      " : " +
      result
  );
}

function hitungKataUnik(kalimat) {
  const words = kalimat
    .toLowerCase()
    .replace(/[^\w\s]/gi, "")
    .split(" ");
  const result = new Set(words).size;
  console.log(
    "Jumlah kata unik di kalimat " + "'" + kalimat + "'" + " : " + result
  );
}

function hitungBilanganYangMunculSekali(n) {
  const result = n.filter((element) => n.indexOf(element) === n.lastIndexOf(element));
  console.log("Bilangan yang muncul sekali di array " + n + " : " + result);
}

function hitungJumlahKemunculanKarakter(kalimat) {
  const result = {};
  for (const char of kalimat.toLowerCase()) {
    if (result.hasOwnProperty(char)) {
      result[char] += 1;
    } else {
      result[char] = 1;
    }
  }
  console.log(
    "Jumlah kemunculan karakter di kalimat " +
      "'" +
      kalimat +
      "'" +
      " : " +
      JSON.stringify(Object.fromEntries(Object.entries(result).sort()))
  );
}

function hitungJumlahkombinasi(n, r) {
  let result = 1;
  for (let i = n; i > n - r; i--) {
    result *= i;
  }
  for (let i = 2; i <= r; i++) {
    result /= i;
  }
  console.log("Jumlah kombinasi (" + n + "," + r + ") : " + result);
}

main();
