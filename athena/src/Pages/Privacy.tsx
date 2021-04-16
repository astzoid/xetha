import React from 'react';
import Content from '../Components/Content';
import Meta from '../Components/Meta';
import { useStyles } from '../Styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

export default function Privacy() {

    const styles = useStyles();

    return (
        <Content>
            <Meta title="Privacy Policy" description="The Privacy Policy Notice of Xetha" url="/privacy" keywords={['privacy', 'policy']} />
            <Container>
                <Typography variant="h3" component="h1" color="textPrimary">Privacy Policy</Typography>
                <Container>
                    <Typography className={styles.mt} color="textSecondary">
                        Your privacy is important to us. It is Xetha Development's policy to respect your privacy regarding any information we may collect from you across our website/services, and other sites we own and operate.
                    </Typography>
                    <Typography className={styles.mt} color="textSecondary">
                        We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.
                    </Typography>
                    <Typography className={styles.mt} color="textSecondary">
                        We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we’ll protect within commercially acceptable means to prevent loss and theft, as well as unauthorised access, disclosure, copying, use or modification.
                    </Typography>
                    <Typography className={styles.mt} color="textSecondary">
                        We don’t share any personally identifying information publicly or with third-parties, except when required to by law.
                    </Typography>
                    <Typography className={styles.mt} color="textSecondary">
                        Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites, and cannot accept responsibility or liability for their respective privacy policies.
                    </Typography>
                    <Typography className={styles.mt} color="textSecondary">
                        You are free to refuse our request for your personal information, with the understanding that we may be unable to provide you with some of your desired services
                    </Typography>
                    <Typography className={styles.mt} color="textSecondary">
                        Your continued use of our website will be regarded as acceptance of our practices around privacy and personal information. If you have any questions about how we handle user data and personal information, feel free to contact us.
                    </Typography>
                </Container>
            </Container>
        </Content>
    );
}