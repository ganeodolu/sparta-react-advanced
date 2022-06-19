import React from 'react'
import Card from '../components/Card'
import { Grid } from "../elements";

const mockup = ['스파르타', '헤라클레스', '헤라'];

const Notification = () => {
  return (
    <Grid padding="10px">
      {mockup.map((nickname, idx) => {
        return (
					<Grid isFlex>
						<Card text={nickname} key={idx}></Card>
					</Grid>
				);
      })}
    </Grid>
  )
}

export default Notification
