
export type commonObjType = {
  [T: string]: string
}
interface stylesConfig {
  main: commonObjType,
  box: commonObjType,
}
export const styles: stylesConfig = {
  main: {
    fontFamily: '\'Poppins\',san-serif',
    display: 'grid',
    gridTemplateColumns: 'repeat(10,40px)',
    // width: "400px",
    margin: '0 auto',
    border: '10px solid #e44527',
    borderRadius: '0 0 7px 7px'
  },
  box: {
    width: '40px',
    height: '40px',
    border: '1px dashed #070920',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer'
  },
}
