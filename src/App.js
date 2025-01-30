import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {




  let ans = "The solution of the system of linear equations is as follows \n ";
  const [ansDisp, setAndDisp] = useState(ans);



  let A = Array(3);
  let B = Array(3);
  for (let i = 0; i < 3; i++) {
    A[i] = [0, 0, 0];
    for (let j = 0; j < 3; j++) {
      A[i][j] = 0;
    }
    B[i] = 0;
  }

  let L = Array(3);
  for (let i = 0; i < 3; i++) {
    L[i] = [0, 0, 0];
  }





  function update_lower_matrix() {
    L[0][0] = Math.sqrt(A[0][0]);
    console.log(L[0][0]);
    L[1][0] = A[1][0] / L[0][0];
    console.log(L[1][0]);
    L[2][0] = A[2][0] / L[0][0];
    console.log(L[2][0]);

    L[1][1] = Math.sqrt(A[1][1] - L[1][0] * L[1][0]);
    console.log(L[1][1]);
    L[2][1] = (A[2][1] - L[2][0] * L[1][0]) / L[1][1];
    console.log(L[2][1]);
    L[2][2] = Math.sqrt(A[2][2] - L[2][0] * L[2][0] - L[2][1] * L[2][1]);
    console.log(L[2][2]);

    alert(JSON.stringify(L));
  }



  function addAToSol() {
    ans += JSON.stringify(A, '');
    ans += " * [X,Y,Z] = [" + B[0] + "," + B[1] + "," + B[2] + "] \n";
    ans += `
--------------------------------------------------------------------------------------------------------------------------
1) L11^2 = A11                 
L11 = sqrt(A11)

2) L21*L11 = A21          4) L21^2 + L22^2 = A22
L11 = A21/l11             L22 = sqrt(A22 - L21^2)

3) L31*l11 = A31          5) L31*L21 + L32*L22 = A32         6) L31^2 + L32^2 + L33^2 = A33
L31 = A31 /L11            A32 = (A32 - L31*L21)/L22          L33 = sqrt(A33 - L31^2 - L32^2)
    `
    ans += `


---------------------------------------------------------------------------------------------------------------------------
1) L00^2 = ${A[0][0]}                 
L00 = sqrt(${A[0][0]}) = ${L[0][0]}

2) L10 * ${L[0][0]} = ${A[1][0]}                      4) ${L[1][0]}^2 + L11^2 = ${A[1][1]}
L10 = ${A[1][0]} / ${L[0][0]} = ${L[1][0]}            L11 = sqrt(${A[1][1]} - ${L[1][0]}^2) = ${L[1][1]}

3) L20 * ${L[0][0]} = ${A[2][0]}                       5) ${L[2][0]} * ${L[1][0]} + L21 * ${L[1][1]} = ${A[2][1]}                      6) ${L[2][0]}^2 + ${L[2][1]}^2 + L22^2 = ${A[2][2]}
L20 = ${A[2][0]} / ${L[0][0]} = ${L[2][0]}             L21 = (${A[2][1]} - ${L[2][0]} * ${L[1][0]}) / ${L[1][1]} = ${L[2][1]}          L22 = sqrt(${A[2][2]} - ${L[2][0]}^2 - ${L[2][1]}^2) = ${L[2][2]}

    `

    let R = [[0]];
    ans += `


  -------------------------------------------------------------------------------------------------------------------------
| ${L[0][0]}             ${R[0][0]}           ${R[0][0]}    |  | ${L[0][0]}             ${L[1][0]}          ${L[2][0]}| | X |    | ${B[0]} |
| ${L[1][0]}            ${L[1][1]}            ${R[0][0]}    |  | ${R[0][0]}             ${L[1][1]}          ${L[2][1]}| | Y |  = | ${B[1]} |
| ${L[2][0]}             ${L[2][1]}           ${L[2][2]}    |  | ${R[0][0]}             ${R[0][0]}          ${L[2][2]}| | Z |    | ${B[2]} |

    `
    ans += `
| ${L[0][0]}            ${R[0][0]}           ${R[0][0]}    |  | Z1 |    | ${B[0]} |
| ${L[1][0]}            ${L[1][1]}           ${R[0][0]}    |  | Z2 |  = | ${B[1]} |
| ${L[2][0]}             ${L[2][1]}          ${L[2][2]}    |  | Z3 |    | ${B[2]} |

    `

    let Z1 = B[0] / L[0][0];
    let Z2 = (B[1] - L[1][0] * Z1) / L[1][1];
    let Z3 = (B[2] - L[2][0] * Z1 - L[2][1] * Z2) / L[2][2];
    ans += `
    -----------------------------------------------------------------------------------------------------
    Step 1: Solve for Z1
    ${L[0][0]} * Z1 = ${B[0]}
    Z1 = ${B[0]} / ${L[0][0]} = ${Z1}\n
    `;
    ans += `
    Step 2: Solve for Z2
    ${L[1][0]} * Z1 + ${L[1][1]} * Z2 = ${B[1]}
    ${L[1][1]} * Z2 = ${B[1]} - (${L[1][0]} * ${Z1})
    Z2 = (${B[1]} - ${L[1][0]} * ${Z1}) / ${L[1][1]} = ${Z2}\n
    `;
    ans += `
    Step 3: Solve for Z3
    ${L[2][0]} * Z1 + ${L[2][1]} * Z2 + ${L[2][2]} * Z3 = ${B[2]}
    ${L[2][2]} * Z3 = ${B[2]} - (${L[2][0]} * ${Z1}) - (${L[2][1]} * ${Z2})
    Z3 = (${B[2]} - ${L[2][0]} * ${Z1} - ${L[2][1]} * ${Z2}) / ${L[2][2]} = ${Z3}\n

    
    `;

    let X3 = Z3 / L[2][2];
    let X2 = (Z2 - L[2][1] * X3) / L[1][1];
    let X1 = (Z1 - L[1][0] * X2 - L[2][0] * X3) / L[0][0];

    ans += `
    ---------------------------------------------------------------------------------------------------------
    Step 4: Solve for X3
    ${L[2][2]} * X3 = ${Z3}
    X3 = ${Z3} / ${L[2][2]} = ${X3}\n
    `;
    ans += `
    Step 5: Solve for X2
    ${L[1][1]} * X2 + ${L[2][1]} * X3 = ${Z2}
    ${L[1][1]} * X2 = ${Z2} - (${L[2][1]} * ${X3})
    X2 = (${Z2} - ${L[2][1]} * ${X3}) / ${L[1][1]} = ${X2}\n
    `;
    ans += `
    Step 6: Solve for X1
    ${L[0][0]} * X1 + ${L[1][0]} * X2 + ${L[2][0]} * X3 = ${Z1}
    ${L[0][0]} * X1 = ${Z1} - (${L[1][0]} * ${X2}) - (${L[2][0]} * ${X3})
    X1 = (${Z1} - ${L[1][0]} * ${X2} - ${L[2][0]} * ${X3}) / ${L[0][0]} = ${X1}\n
    `;

    setAndDisp(ans);



  }





  return (
    <div className="App" style={{ backgroundColor: "" }}>
      <div style={{ width: "40%", minWidth: "600px", margin: "auto", marginTop: "30px", backgroundColor: "skyblue" }}>
        {/* <div id='eqn1' style={{display: 'flex'}}>
          <div className='unit'><input type='number'></input>X + </div>
          <div className='unit'><input type='number'></input>Y + </div>
          <div className='unit'><input type='number'></input>Z = </div>
          <div className='unit'><input type='number'></input></div>
        </div>
        <div id='eqn2' style={{display: 'flex'}}>
          <div className='unit'><input type='number'></input>X + </div>
          <div className='unit'><input type='number'></input>Y + </div>
          <div className='unit'><input type='number'></input>Z = </div>
          <div className='unit'><input type='number'></input></div>
        </div>
        <div id='eqn3' style={{display: 'flex'}}>
          <div className='unit'><input type='number'></input>X + </div>
          <div className='unit'><input type='number'></input>Y + </div>
          <div className='unit'><input type='number'></input>Z = </div>
          <div className='unit'><input type='number'></input></div>
        </div> */}

        {A.map((val, ind) => {
          return <>
            <div style={{ display: "flex", width: "fit-content", margin: "auto" }} key={ind}>
              <div className='unit'><input type='number' style={{ backgroundColor: "transparent", width: "50px", border: "none", borderBottom: "3px solid black", margin: "10px" }} onChange={(event) => {
                A[ind][0] = event.target.value;
              }}></input>X + </div>
              <div className='unit'><input type='number' style={{ backgroundColor: "transparent", width: "50px", border: "none", borderBottom: "3px solid black", margin: "10px" }} onChange={(event) => {
                A[ind][1] = event.target.value;
              }}></input>Y + </div>
              <div className='unit'><input type='number' style={{ backgroundColor: "transparent", width: "50px", border: "none", borderBottom: "3px solid black", margin: "10px" }} onChange={(event) => {
                A[ind][2] = event.target.value;
              }}></input>Z = </div>
              <div className='unit'><input type='number' style={{ backgroundColor: "transparent", width: "50px", border: "none", borderBottom: "3px solid black", margin: "10px" }} onChange={(event) => {
                B[ind] = event.target.value;
                // alert(JSON.stringify(A))
              }}></input></div>

            </div >
          </>

        })}


        <div style={{margin: "auto", width: "100px", marginTop: "50px", marginBottom: "50px", paddingBottom: "50px"}}>        <button className='button glow-button' onClick={(event) => {
          update_lower_matrix();
          addAToSol();

        }}>Submit</button></div>

      </div>

      <div style={{ marginTop: "100px", width: "400px", alignItems: "center", alignItems: "center" }}>


      </div>

      <div style={{width: "100%"}}>
      <div style={{ whiteSpace: "pre-wrap", textAlign: "left" , overflowX: "auto" , width: "fit-content", minWidth: "900px", margin: "auto",marginTop: "50px"}}>{ansDisp}</div>

      </div>


    </div>
  );
}

export default App;
