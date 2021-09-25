import React, { useEffect, useState } from "react";

import "./style.css";

const StrengthChecker = ({ password, containerClass }) => {
  const [Password, setPassword] = useState("");
  const [StrengthLabel, setStrengthLabel] = useState("WEAK");

  useEffect(() => {
    setPassword(password);
  }, [password]);

  useEffect(() => {
    const strengthMeter = document.getElementById("strength-meter");

    updateStrengthMeter();

    function updateStrengthMeter() {
      const weaknesses = calculatePasswordStrength(Password);

      const red = "#ff0000";
      const yellow = "#fbb03b";
      const green = "#76da29";

      let strength = 100;
      weaknesses.forEach((weakness) => {
        if (weakness == null) return;
        strength -= weakness.deduction;
      });

      if (strength > 66) {
        strengthMeter.style.setProperty("--strengthColor", green);
        setStrengthLabel("GREAT");
      } else if (strength > 33) {
        strengthMeter.style.setProperty("--strengthColor", yellow);
        setStrengthLabel("GOOD");
      } else {
        strengthMeter.style.setProperty("--strengthColor", red);
        setStrengthLabel("BAD");
      }

      strengthMeter.style.setProperty("--strength", strength);
    }

    function calculatePasswordStrength(password) {
      const weaknesses = [];
      weaknesses.push(lengthWeakness(password));
      weaknesses.push(lowercaseWeakness(password));
      weaknesses.push(uppercaseWeakness(password));
      weaknesses.push(numberWeakness(password));
      weaknesses.push(specialCharactersWeakness(password));
      weaknesses.push(repeatCharactersWeakness(password));
      return weaknesses;
    }

    function lengthWeakness(password) {
      const length = password.length;

      if (length <= 5) {
        return {
          message: "Your password is too short",
          deduction: 40,
        };
      }

      if (length <= 10) {
        return {
          message: "Your password could be longer",
          deduction: 15,
        };
      }
    }

    function uppercaseWeakness(password) {
      return characterTypeWeakness(password, /[A-Z]/g, "uppercase characters");
    }

    function lowercaseWeakness(password) {
      return characterTypeWeakness(password, /[a-z]/g, "lowercase characters");
    }

    function numberWeakness(password) {
      return characterTypeWeakness(password, /[0-9]/g, "numbers");
    }

    function specialCharactersWeakness(password) {
      return characterTypeWeakness(
        password,
        /[^0-9a-zA-Z\s]/g,
        "special characters"
      );
    }

    function characterTypeWeakness(password, regex, type) {
      const matches = password.match(regex) || [];

      if (matches.length === 0) {
        return {
          message: `Your password has no ${type}`,
          deduction: 20,
        };
      }

      if (matches.length <= 2) {
        return {
          message: `Your password could use more ${type}`,
          deduction: 5,
        };
      }
    }

    function repeatCharactersWeakness(password) {
      const matches = password.match(/(.)\1/g) || [];
      if (matches.length > 0) {
        return {
          message: "Your password has repeat characters",
          deduction: matches.length * 10,
        };
      }
    }
  }, [Password]);

  return (
    <div className={`strength-checker-container ${containerClass}`}>
      <div className="strength-meter" id="strength-meter" />
      <div className="strength-label" style={{ display: "none" }}>
        {StrengthLabel}{" "}
      </div>
    </div>
  );
};

export default StrengthChecker;
