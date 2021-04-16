import React, { useState, useEffect, useMemo, lazy, MouseEvent } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Grow from '@material-ui/core/Grow';

import Loader from '../Components/Loader';
import Content from '../Components/Content';
import Meta from '../Components/Meta';
import Sensor from '../Components/Sensor';
import RequestHandler from '../Api/RequestHandler';
import { useStyles } from '../Styles';

const ServerError = lazy(() => import('./Errors/ServerError'));

interface Command {
    name: string;
    description: string;
    usage: string[];
    category?: string;
    aliases: string[];
}

const useStyles1 = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
}));

interface TablePaginationProps {
    count: number,
    page: number,
    rowsPerPage: number,
    onChangePage: (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, n: number) => any;
}

function TablePaginationActions(props: TablePaginationProps) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;

    return (
        <div className={classes.root}>
            <IconButton
                onClick={(event) => onChangePage(event, 0)}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={(event) => onChangePage(event, page - 1)} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={(event) => onChangePage(event, page + 1)}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={(event) => onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </div>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

const useStyles2 = makeStyles({
    table: {
        minWidth: 500,
    },
});

const useStyles3 = makeStyles({
    card: {
        minWidth: '500px',
        maxWidth: '500px',
        minHeight: '100px',
        margin: '1rem',
    },
    container: {
        margin: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
});

function Command(command: Command) {
    const [visible, setVisible] = useState(false);
    const styles = useStyles3();

    return (
        <Sensor once onChange={(visible) => setVisible(visible)}>
            <Grow timeout={400} in={visible}>
                <Card className={styles.card}>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            {command.name}
                        </Typography>
                        <Typography variant="body1" component="p" color="textSecondary">
                            {command.description}
                        </Typography>
                        <Typography variant="body2" component="code" color="primary">
                            {command.usage.map((str) => <><span>{str}</span><br /></>)}
                        </Typography>
                    </CardContent>
                </Card>
            </Grow>
        </Sensor>
    );
}

export default function Commands() {

    const history = useHistory();
    const location = useLocation();
    const [status, setStatus] = useState(0);
    const [commands, setCommands] = useState<Command[]>([]);
    const [search, setSearch] = useState<string>('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const styles = useStyles();
    const classes = useStyles2();
    const styles3 = useStyles3();

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, commands.length - page * rowsPerPage);

    const handleChangePage = (_event: any, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        if (location.search) {
            const query = new URLSearchParams(location.search);
            if (!query.has('error')) {
                const value = query.get('search');
                if (value && typeof value === 'string' && value.length) setSearch(value);
            }
        }
        RequestHandler.request<Command[]>('GET', { route: '/api/commands' })
            .then((response) => setCommands(response.body))
            .then(() => setStatus(200))
            .catch((err) => {
                console.error(err);
                setStatus(500);
            });
    }, []);

    useEffect(() => {
        if (search.length) {
            history.push(`?search=${encodeURIComponent(search)}`);
        } else {
            history.push({ search: '' });
        }
    }, [search]);

    const results = useMemo(() => {
        const pattern = new RegExp(
            search
                .split(' ')
                .map((term) => `(?=.*${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`)
                .join(''),
            'i'
        );
        return commands.filter((command) => command.name.match(pattern) || command.aliases.some((alias) => alias.match(pattern)));
    }, [search]);

    return (
        <Content>
            <Meta title="Commands" description="List of all the bot's Commands" url="/commands" keywords={['commands', 'command']} />
            {(status === 200) ?
                <Container>
                    <Container className={styles.center}>
                        <Typography variant="h3" component="h1" color="textPrimary">Commands</Typography>
                        <br />
                        <form noValidate autoComplete="off">
                            <Input onChange={(event) => setSearch(event.target.value)} placeholder="Search For A Command" inputProps={{ 'aria-label': 'search' }} />
                        </form>
                        <br />
                        {search.length ?
                            <>
                                <Typography variant="body1" color="textSecondary">Found {results.length} result{results.length > 1 ? 's' : null} for "{search}" </Typography>
                                {results.length === 1 ?
                                    <Meta
                                        title={`${results[0].name} Command`}
                                        description={results[0].description}
                                        url={`/commands?search=${encodeURIComponent(results[0].name)}`}
                                        keywords={['command', 'commands', results[0].name, ...results[0].aliases]}
                                    />
                                    : null
                                }
                                <Container className={styles3.container}>
                                    {results.map((command) => <Command {...command} />)}
                                </Container>
                            </>
                            :
                            <TableContainer component={Paper}>
                                <Table className={classes.table} aria-label="custom pagination table">
                                    <TableBody>
                                        {(rowsPerPage > 0
                                            ? commands.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            : commands
                                        ).map((row) => (
                                            <TableRow key={row.name}>
                                                <TableCell style={{ width: '30%' }}>
                                                    {row.name}
                                                </TableCell>
                                                <TableCell style={{ width: '30%' }}>
                                                    {row.description}
                                                </TableCell>
                                                <TableCell style={{ width: '30%' }}>
                                                    {row.usage[0]}
                                                </TableCell>
                                            </TableRow>
                                        ))}

                                        {emptyRows > 0 && (
                                            <TableRow style={{ height: 53 * emptyRows }}>
                                                <TableCell colSpan={6} />
                                            </TableRow>
                                        )}
                                    </TableBody>
                                    <TableFooter>
                                        <TableRow>
                                            <TablePagination
                                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                                colSpan={3}
                                                count={commands.length}
                                                rowsPerPage={rowsPerPage}
                                                page={page}
                                                SelectProps={{
                                                    inputProps: { 'aria-label': 'rows per page' },
                                                    native: true,
                                                }}
                                                onChangePage={handleChangePage}
                                                onChangeRowsPerPage={handleChangeRowsPerPage}
                                                ActionsComponent={TablePaginationActions}
                                            />
                                        </TableRow>
                                    </TableFooter>
                                </Table>
                            </TableContainer>
                        }
                    </Container>
                </Container>
                : status === 0 ?
                    <Loader />
                    : <ServerError />
            }
        </Content>
    );
}
