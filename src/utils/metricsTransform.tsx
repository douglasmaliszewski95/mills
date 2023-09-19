export function formatCentimetersAndGrams(centimetersAngGrams: number) {
  const metersAndKg = Math.floor(centimetersAngGrams / 100);
  const remainingCentimetersAndGrams = centimetersAngGrams % 100;
  const metersWithDecimals = metersAndKg + remainingCentimetersAndGrams / 100;

  return metersWithDecimals;
}
