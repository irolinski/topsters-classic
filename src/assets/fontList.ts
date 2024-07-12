// const fontFamilyOptions = () => {
//   return (
//     <>
//       <option disabled>-- Monospaced --</option>
//       <option value={"Space Mono"}>Space Mono</option>
//       <option value={"Roboto Mono"}>Roboto Mono</option>
//       <option value={"Nanum Gothic Coding"}>Nanum Gothic Coding</option>
//       <option value={"Courier Prime"}>Courier Prime</option>
//       <option value={"Sometype Mono"}>Sometype Mono</option>
//       <option disabled>-- Sans-serif --</option>
//       <option value={"Inter"}>Inter</option>
//       <option value={"Rubik"}>Rubik</option>
//       <option disabled>-- Serif --</option>
//       <option value={"Arvo"}>Arvo</option>
//       <option value={"Shrikhand"}>Shrikhand</option>
//       <option value={"Arbutus"}>Arbutus</option>
//       <option disabled>-- Weird --</option>
//       <option value={"Rubik Glitch Pop"}>Rubik Glitch Pop</option>
//       <option value={"Danfo"}>Danfo</option>
//       <option value={"Rubik Moonrocks"}>Rubik Moonrocks</option>
//       <option value={"Orbitron"}>Orbitron</option>
//     </>
//   );
// };

const fontList = [
  {
    name: "Monospaced",
    fonts: [
      "Space Mono",
      "Roboto Mono",
      "Nanum Gothic Coding",
      "Courier Prime",
      "Sometype Mono",
    ],
  },
  {
    name: "Sans-serif",
    fonts: ["Inter", "Rubik"],
  },
  {
    name: "Serif",
    fonts: ["Arvo", "Shrikhand", "Arbutus"],
  },
  {
    name: "Weird",
    fonts: ["Rubik Glitch Pop", "Rubik Moonrocks", "Danfo", "Orbitron"],
  },
];

export default fontList;
