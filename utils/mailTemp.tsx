import {
  Mjml,
  MjmlBody,
  MjmlSection,
  MjmlColumn,
  MjmlImage,
  MjmlText
} from 'mjml-react';


export function generate() {
    return (
    <Mjml>
      <MjmlBody>
        <MjmlSection fullWidth backgroundColor="#efefef">
          <MjmlColumn>
            <MjmlImage src="https://www.logolynx.com/images/logolynx/ef/eff61be9c4acbaf64bb160e465636609.png" width="200px" />
          </MjmlColumn>
        </MjmlSection>
        <MjmlSection fullWidth backgroundColor="#21211f">
          <MjmlColumn>
           <MjmlText align="center" font-size="64px" color="#FFFEF8">WE'RE HONORED</MjmlText>
            <MjmlText align="center" color="#FFFEF8">There's a lot of choices out there but you singled us out
            and that means a lot. We just want to express how much
            we appreciate your business.When you're looking for
            something truly special, we hope that we'll continue to be
            the place you think of first.</MjmlText>
            <MjmlText align="center" color="#FFFEF8">Thank you!</MjmlText>
            <MjmlText align="center" color="#FFFEF8">Ecommerce Wesite</MjmlText>
          </MjmlColumn>
        </MjmlSection>
      </MjmlBody>
    </Mjml>
    )
}