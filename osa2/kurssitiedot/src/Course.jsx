const Header = (props) => {
    return <h1>{props.course}</h1>
  }
  
  const Total = (props) => {
    const total = props.parts.reduce((sum, part) => sum + part.exercises, 0)
    return <h4>Total of exercises {total} </h4>
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.part} {props.exercises}
      </p>
    )
  }
  
  const Content = (props) => {
    return (
      <div>
        {props.parts.map(part =>
          <Part key={part.id} part={part.name} exercises={part.exercises}
          />
        )}
      </div>
    )
  }
  const Course = (props) => {
    return (
      <div>
        <Header course={props.course.name} />
        <Content parts={props.course.parts} />
        <Total parts={props.course.parts} />
      </div>
    )
  }

  export default Course