import React from 'react';
import styled from 'react-emotion';

const Projects = (props) => {

  const Container = styled(`div`)`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  align-items: center;
  
`
const Post = styled('div')`
  width: 30%;
  border: solid thin black;
  margin: 5px auto;
`
console.log(props)
  return (
    
    <Container>
      {props.projects.map(posts => {
        return (
          <Post key={posts.id}>            
            <div className="border-bottom">{posts.name}</div>
            <div>{posts.description}</div>
            
          </Post>
      )
      })}
    </Container>
  ) 
}
 
export default Projects;