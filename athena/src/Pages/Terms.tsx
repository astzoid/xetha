import React from 'react';
import Content from '../Components/Content';
import Meta from '../Components/Meta';
import { useStyles } from '../Styles';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

export default function Terms() {
  const styles = useStyles();

  return (
    <Content>
      <Meta
        title="Terms of Service"
        description="The Terms of Service of Xetha"
        url="/terms"
        keywords={['terms', 'service']}
      />
      <Container>
        <Typography variant="h3" component="h1" color="textPrimary">
          Terms of Service
        </Typography>
        <Container>
          <Typography
            className={styles.mg}
            variant="h4"
            component="h2"
            color="textPrimary"
          >
            1. Terms
          </Typography>
          <Container>
            <Typography color="textSecondary">
              By accessing/using our website, you are agreeing to be bound by
              these terms of service, all applicable laws and regulations, and
              agree that you are responsible for compliance with any applicable
              local laws. If you do not agree with any of these terms, you are
              prohibited from using or accessing this site. The materials
              contained in this website are protected by applicable copyright
              and trademark law.
              <br />
              And also by accessing/using our website/services you expressly
              agree to this <a href="#">Agreement</a>.
              <br />
              And by using Discord you expressly agree to Discord's{' '}
              <a href="https://discord.com/terms">Terms of Service</a>,{' '}
              <a href="https://discord.com/privacy">Privacy Policy</a>, and{' '}
              <a href="https://discord.com/guidelines">Community Guidelines</a>.
            </Typography>
          </Container>
          <Typography
            className={styles.mg}
            variant="h4"
            component="h2"
            color="textPrimary"
          >
            2. Use License
          </Typography>
          <Container>
            <Typography color="textSecondary">
              A. Permission is granted to temporarily download one copy of the
              materials (information or software) on Xetha Development's website
              for personal, non-commercial transitory viewing only. This is the
              grant of a license, not a transfer of title, and under this
              license you may not:
            </Typography>
            <Container className={styles.mg}>
              <Typography color="textSecondary">
                I. modify or copy the materials;
              </Typography>
              <Typography color="textSecondary">
                II. use the materials for any commercial purpose, or for any
                public display (commercial or non-commercial);
              </Typography>
              <Typography color="textSecondary">
                III. attempt to decompile or reverse engineer any software
                contained on Xetha Development's website;
              </Typography>
              <Typography color="textSecondary">
                IV. remove any copyright or other proprietary notations from the
                materials; or
              </Typography>
              <Typography color="textSecondary">
                V. transfer the materials to another person or "mirror" the
                materials on any other server.
              </Typography>
            </Container>
            <Typography className={styles.mg} color="textSecondary">
              B. This license shall automatically terminate if you violate any
              of these restrictions and may be terminated by Xetha Development
              at any time. Upon terminating your viewing of these materials or
              upon the termination of this license, you must destroy any
              downloaded materials in your possession whether in electronic or
              printed format.
            </Typography>
          </Container>
          <Typography
            className={styles.mg}
            variant="h4"
            component="h2"
            color="textPrimary"
          >
            3. Disclaimer
          </Typography>
          <Container>
            <Typography color="textSecondary">
              A. The materials on Xetha Development's website are provided on an
              'as is' basis. Xetha Development makes no warranties, expressed or
              implied, and hereby disclaims and negates all other warranties
              including, without limitation, implied warranties or conditions of
              merchantability, fitness for a particular purpose, or
              non-infringement of intellectual property or other violation of
              rights.
            </Typography>
            <Typography className={styles.mg} color="textSecondary">
              B. Further, Xetha Development does not warrant or make any
              representations concerning the accuracy, likely results, or
              reliability of the use of the materials on its website or
              otherwise relating to such materials or on any sites linked to
              this site.
            </Typography>
          </Container>
          <Typography
            className={styles.mg}
            variant="h4"
            component="h2"
            color="textPrimary"
          >
            3. Limitations
          </Typography>
          <Container className={styles.mg}>
            <Typography color="textSecondary">
              In no event shall Xetha Development or its suppliers be liable for
              any damages (including, without limitation, damages for loss of
              data or profit, or due to business interruption) arising out of
              the use or inability to use the materials on Xetha Development's
              website, even if Xetha Development or a Xetha Development
              authorized representative has been notified orally or in writing
              of the possibility of such damage. Because some jurisdictions do
              not allow limitations on implied warranties, or limitations of
              liability for consequential or incidental damages, these
              limitations may not apply to you.
            </Typography>
          </Container>
          <Typography
            className={styles.mg}
            variant="h4"
            component="h2"
            color="textPrimary"
          >
            5. Accuracy of materials
          </Typography>
          <Container className={styles.mg}>
            <Typography color="textSecondary">
              The materials appearing on Xetha Development's website could
              include technical, typographical, or photographic errors. Xetha
              Development does not warrant that any of the materials on its
              website are accurate, complete or current. Xetha Development may
              make changes to the materials contained on its website at any time
              without notice. However Xetha Development does not make any
              commitment to update the materials.
            </Typography>
          </Container>
          <Typography
            className={styles.mg}
            variant="h4"
            component="h2"
            color="textPrimary"
          >
            6. Links
          </Typography>
          <Container className={styles.mg}>
            <Typography color="textSecondary">
              Xetha Development has not reviewed all of the sites linked to its
              website and is not responsible for the contents of any such linked
              site. The inclusion of any link does not imply endorsement by
              Xetha Development of the site. Use of any such linked website is
              at the user's own risk.
            </Typography>
          </Container>
          <Typography
            className={styles.mg}
            variant="h4"
            component="h2"
            color="textPrimary"
          >
            7. Modifications
          </Typography>
          <Container className={styles.mg}>
            <Typography color="textSecondary">
              Xetha Development may revise these terms of service for its
              website at any time without notice. By using this website you are
              agreeing to be bound by the then current version of these terms of
              service.
            </Typography>
          </Container>
          <Typography
            className={styles.mg}
            variant="h4"
            component="h2"
            color="textPrimary"
          >
            8. Governing Law
          </Typography>
          <Container className={styles.mg}>
            <Typography color="textSecondary">
              These terms and conditions are governed by and construed in
              accordance with the laws of The Philippines and you irrevocably
              submit to the exclusive jurisdiction of the courts in that
              location.
            </Typography>
          </Container>
        </Container>
      </Container>
    </Content>
  );
}
