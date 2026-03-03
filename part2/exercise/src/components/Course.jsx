const TotalExercise = ({parts}) => {
  const totalExercises = parts.reduce((total,current) => total + current.exercises, 0 )
  return <p>total of {totalExercises} exercises</p>
}

const Content = ({parts}) => (
  <div>
  {parts.map(part => <p key = {part.id}>{part.name} {part.exercises}</p>)}
  </div>
)


const Header = ({name}) => (
  <div><h1>{name}</h1></div>
)

const Course = ({ courses }) => (
  <div>
    {courses.map(course => 
      <div key = {course.id}>
        <Header name = {course.name} /> 
        <Content parts = {course.parts} />  
        <TotalExercise parts = {course.parts} /> 
    </div>)
    }
  </div>
)

export default Course