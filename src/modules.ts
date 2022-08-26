export type commonObjType = {
  [T: string]: string
}
interface ClassConfig {
  main: commonObjType,
  box: commonObjType,
  over: commonObjType,
  button: commonObjType,
}
export const classConfig: ClassConfig = {
  main: {
    fontFamily: "'Poppins',san-serif",
    display: "grid",
    gridTemplateColumns: "repeat(10,40px)",
    width: "400px",
    margin: "0 auto",
    border: "1px solid",
  },
  box: {
    width: "40px",
    height: "40px",
    border: "1px solid",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer"
  },
  over: {
    position: "absolute",
    bottom: "0",
    left: "0",
    width: "100vw",
    height: "250px",
    fontSize: "5rem",
    color: "red",
    backgroundColor: "gray",
    border: "2px solid",
    fontFamily: "'Poppins',san-serif",
    display:"flex",
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection:"column",
    padding:"1rem"
  },
  button: {
    padding: "1rem 2rem",
    borderRadius: "5px",
    outline: "none",
    border: "none",
    cursor: "pointer",
    color: "red",
    fontWeight: "600",
  }
}
