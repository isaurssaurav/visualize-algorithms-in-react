import './App.css';
import Grid from './Components/Grid'
import { useEffect, useState } from 'react';
import { useParams } from "react-router";
import { useHistory, useLocation } from 'react-router-dom'
import anime from 'animejs/lib/anime.es.js';
import Slider, { Range, SliderTooltip } from 'rc-slider';
import 'rc-slider/assets/index.css';
const { Handle } = Slider;
function App() {
  let { type } = useParams()
  let location = useLocation()
  let [rows, setRows] = useState(15)
  let [columns, setColumns] = useState(15)

  useEffect(() => {
    reset()
  }, [type])

  let [pVisit, setPVisit] = useState([])

  let directionR = [-1, 0, 1, 1, 1, 0, -1, -1]
  let directionC = [-1, -1, -1, 0, 1, 1, 1, 0]

  let starting_point = [0, 0]

  let visited = []
  let queue = []
  let stack = []

  queue.push(starting_point)
  stack.push(starting_point)

  let start = async () => {
    if (type === "bfs") {
      bfs()
    } else {
      dfs()
    }
  }
  let dfs = async () => {
    while (stack.length > 0) {
      let current_point = stack.pop()
      let current_point_x = current_point[0]
      let current_point_y = current_point[1]
      visited.push("" + current_point_x + current_point_y)
      setPVisit(visited)
      let neighbouring_points = getNeighbouringPoints(current_point, visited, stack)
      if (neighbouring_points.length > 0) {
        stack.push(...neighbouring_points)
      }

    }
    return

  }
  let bfs = async () => {
    while (queue.length > 0) {
      let current_point = queue.shift()
      let current_point_x = current_point[0]
      let current_point_y = current_point[1]
      visited.push("" + current_point_x + current_point_y)
      setPVisit(visited)
      let neighbouring_points = getNeighbouringPoints(current_point, visited, queue)
      if (neighbouring_points.length > 0) {
        queue.push(...neighbouring_points)
      }

    }
    return
  }

  let getNeighbouringPoints = (current_point, visited, queue) => {
    let result = []
    for (let i = 0; i < 8; i++) {
      let newR = current_point[0] + directionR[i]
      let newC = current_point[1] + directionC[i]
      if (newR > rows - 1 || newC > columns - 1) {
        continue
      }
      if (newR < 0 || newC < 0) {
        continue
      }
      if (visited.includes("" + newR + newC)) {
        continue
      }
      let isInQueue = false
      queue.map((val, index) => {
        if (newR == val[0] && newC == val[1]) {
          isInQueue = true
          return
        }
      })
      if (isInQueue) {
        continue
      }
      // debugger
      result.push([newR, newC])
      // if (newR)


    }
    return result

  }

  let reset = () => {
    visited = []
    setPVisit([])
    queue = []
    let targets = ".gridStyle"
    anime({
      targets,

      scale: [
        { value: .5, easing: 'easeOutSine', duration: 500 },
        { value: 1, easing: 'easeInOutQuad', duration: 1000 }
      ],
      easing: "easeOutSine",
      backgroundColor: '#2e4d39',
      duration: 800
    });

  }
  const handle = props => {
    const { value, dragging, index, ...restProps } = props;
    setColumns(value)
    setRows(value)
    // reset()
    return (
      <SliderTooltip
        prefixCls="rc-slider-tooltip"
        overlay={`${value}`}
        visible={dragging}
        placement="top"
        key={index}
      >
        <Handle value={value} {...restProps} />
      </SliderTooltip>
    );
  };

  return (
    <>
      <h1 className="title">
        Visualization Algorithms In React
          </h1>
      <div className="App">
        <div className="container">
          <div>
          </div>
          <Slider min={1} max={30} defaultValue={15} handle={handle} />
          <div className="btn-container">

            <button onClick={start}>start</button>
            <button onClick={reset}>reset</button>
          </div>

          <Grid
            rows={rows}
            columns={columns}
            visited={pVisit}
          />
        </div>
      </div>
    </>
  );
}

export default App;
