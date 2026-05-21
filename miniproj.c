#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <Servo.h>

#define TRIG_PIN 9
#define ECHO_PIN 10
#define GREEN_LED 2
#define RED_LED 3
#define BUZZER 4
#define SERVO_PIN 6

LiquidCrystal_I2C lcd(0x27, 16, 2);
Servo myServo;

int pos = 0;
int direction = 1;

String lastState = "";

// ---------- Distance Reading with Averaging ----------
long readDistance() {
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);

  long duration = pulseIn(ECHO_PIN, HIGH, 30000); // timeout added
  return duration * 0.034 / 2;
}

long getStableDistance() {
  long sum = 0;
  int validReadings = 0;

  for (int i = 0; i < 5; i++) {
    long d = readDistance();
    if (d > 0) {   // ignore invalid readings
      sum += d;
      validReadings++;
    }
    delay(5);
  }

  if (validReadings == 0) return 0;
  return sum / validReadings;
}

// ---------- LCD Update (no flicker) ----------
void updateLCD(String line1, String line2, String state) {
  if (state != lastState) {
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print(line1);
    lcd.setCursor(0, 1);
    lcd.print(line2);
    lastState = state;
  }
}

// ---------- Beep Patterns ----------
void warningBeep() {
  digitalWrite(BUZZER, HIGH);
  delay(100);   // short beep
  digitalWrite(BUZZER, LOW);
}

void dangerBeep() {
  digitalWrite(BUZZER, HIGH);
  delay(600);   // long beep
  digitalWrite(BUZZER, LOW);
}

// ---------- Setup ----------
void setup() {
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  pinMode(GREEN_LED, OUTPUT);
  pinMode(RED_LED, OUTPUT);
  pinMode(BUZZER, OUTPUT);

  myServo.attach(SERVO_PIN);
  myServo.write(pos);

  lcd.begin(16, 2);
  lcd.backlight();

  lcd.setCursor(0, 0);
  lcd.print(" Sonar System ");
  delay(2000);
  lcd.clear();
}

// ---------- Loop ----------
void loop() {
  long distance = getStableDistance();

  // -------- SAFE ZONE --------
  if (distance > 20 || distance == 0) {

    digitalWrite(GREEN_LED, HIGH);
    digitalWrite(RED_LED, LOW);
    digitalWrite(BUZZER, LOW);

    updateLCD("Area Safe", "Scanning...", "SAFE");

    // Servo scans only here
    myServo.write(pos);
    delay(15);
    pos += direction;

    if (pos >= 180 || pos <= 0) {
      direction = -direction;
    }
  }

  // -------- WARNING ZONE --------
  else if (distance > 10 && distance <= 20) {

    digitalWrite(GREEN_LED, LOW);
    digitalWrite(RED_LED, HIGH);

    updateLCD("Warning", "Object Nearby", "WARNING");

    warningBeep();   // short beep
    delay(300);

    // Hold position
    myServo.write(pos);
  }

  // -------- DANGER ZONE --------
  else if (distance <= 10 && distance > 0) {

    digitalWrite(GREEN_LED, LOW);
    digitalWrite(RED_LED, HIGH);

    updateLCD(" ALERT !", "Too Close", "DANGER");

    dangerBeep();   // long beep
    delay(300);

    // Hold position
    myServo.write(pos);
  }
}