import React, {useState, useEffect} from "react";
import "./style.css";

export default function App() {
  const [showBlue, setShowBlue] = useState(false);
  const [startPos, setStartPos] = useState()
  const [finalPos, setFinalPos] = useState()
  const [ballPos, setBallPos] = useState({ x: 0, y: 0 })
  const startPosRef = React.useRef()
  const finalPosRef = React.useRef()

  const rectStyle = { width: '200px', height: '200px', backgroundColor: 'red', position: 'relative' };

  useEffect(_ => {
    // console.log('start-pos ref: ', startRect, 'final pos:' , finalRect);
    if(!showBlue) {
      const startRect = startPosRef?.current?.getBoundingClientRect() || {}
      // setStartPos({x: startRect.x, y: startRect.y});
      // setFinalPos({ x: finalRect.x, y: finalRect.y });
      setBallPos({ x: startRect.x, y: startRect.y })
    } else {
      const finalRect = finalPosRef?.current?.getBoundingClientRect() || {}
      setBallPos({ x: finalRect.x, y: finalRect.y })
    }
  }, [showBlue])

  const toggle = () => {
    setShowBlue(!showBlue)
  }

  const ball = <div style={{
    transition: 'top 2s, left 2s',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    backgroundColor: 'yellow',
    position: 'absolute',
    top: `${ballPos?.y || 0}px`,
    left: `${ballPos?.x || 0}px`
  }}></div>

   return (
    <div>
      <button onClick={toggle}>toggle</button>
      {/* panel 1 */}
      { !showBlue && 
      <div style={...rectStyle}>
        <div style={ { padding: '2em' } }>
          should start from here
          <div ref={startPosRef} className={'pos-from'} style={{ display: 'inline-block', backgroundColor: 'white', 
          // width: '40px', 
          // height: '40px' 
          }}>
          <div style={{
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    backgroundColor: 'green',
  }}></div>
          </div>
        </div>
      </div>
      }
      {/* panel 2 */}
      { showBlue &&  
      <div style={{...rectStyle, backgroundColor: 'blue', position: 'relative'}}>should end here
      <div  style={{ width: '40px', height: '40px', backgroundColor: '', margin: '1em', position: 'absolute', bottom: '10px', right: '10px' }}>
          <div
                ref={finalPosRef}
                style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              backgroundColor: 'purple',
            }}>

            </div>
      </div>

      </div>
      }
      {ball}
    </div>
  );
}
