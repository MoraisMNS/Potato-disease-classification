/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Container,
  Card,
  CardContent,
  Paper,
  CardActionArea,
  CardMedia,
  Grid,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Button,
  CircularProgress,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import Clear from "@mui/icons-material/Clear";
import cblogo from "./cblogo.PNG";
import image from "./bg.png";
import axios from "axios";



const ColorButton = styled(Button)`
  color: ${props => props.theme.palette.getContrastText('#fff')};
  background-color: #fff;
  &:hover {
    background-color: #ffffff7a;
  }
`;

const useStyles = (theme) => ({
  grow: css`
    flex-grow: 1;
  `,
  clearButton: css`
    width: -webkit-fill-available;
    border-radius: 15px;
    padding: 15px 22px;
    color: #000000a6;
    font-size: 20px;
    font-weight: 900;
  `,
  root: css`
    max-width: 345;
    flex-grow: 1;
  `,
  media: css`
    height: 400px;
  `,
  paper: css`
    padding: theme.spacing(2),
    margin: auto;
    max-width: 500px;
  `,
  gridContainer: css`
    justify-content: center;
    padding: 4em 1em 0 1em;
  `,
  mainContainer: css`
    background-image: url(${image});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    height: 93vh;
    margin-top: 8px;
  `,
  imageCard: css`
    margin: auto;
    max-width: 400px;
    height: 500px;
    background-color: transparent;
    box-shadow: 0px 9px 70px 0px rgb(0 0 0 / 30%) !important;
    border-radius: 15px;
  `,
  imageCardEmpty: css`
    height: auto;
  `,
  noImage: css`
    margin: auto;
    width: 400px;
    height: 400px !important;
  `,
  input: css`
    display: none;
  `,
  uploadIcon: css`
    background: white;
  `,
  tableContainer: css`
    background-color: transparent !important;
    box-shadow: none !important;
  `,
  table: css`
    background-color: transparent !important;
  `,
  tableHead: css`
    background-color: transparent !important;
  `,
  tableRow: css`
    background-color: transparent !important;
  `,
  tableCell: css`
    font-size: 22px;
    background-color: transparent !important;
    border-color: transparent !important;
    color: #000000a6 !important;
    font-weight: bolder;
    padding: 1px 24px 1px 16px;
  `,
  tableCell1: css`
    font-size: 14px;
    background-color: transparent !important;
    border-color: transparent !important;
    color: #000000a6 !important;
    font-weight: bolder;
    padding: 1px 24px 1px 16px;
  `,
  tableBody: css`
    background-color: transparent !important;
  `,
  text: css`
    color: white !important;
    text-align: center;
  `,
  buttonGrid: css`
    max-width: 416px;
    width: 100%;
  `,
  detail: css`
    background-color: white;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  `,
  appbar: css`
    background: #be6a77;
    box-shadow: none;
    color: white;
  `,
  loader: css`
    color: #be6a77 !important;
  `,
});

export const ImageUpload = () => {
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [data, setData] = useState();
  const [image, setImage] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  let confidence = 0;

  const sendFile = async () => {
    if (image) {
      let formData = new FormData();
      formData.append("file", selectedFile);
      let res = await axios({
        method: "post",
        url: process.env.REACT_APP_API_URL,
        data: formData,
      });
      if (res.status === 200) {
        setData(res.data);
      }
      setIsloading(false);
    }
  };
  

  const clearData = () => {
    setData(null);
    setImage(false);
    setSelectedFile(null);
    setPreview(null);
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
  }, [selectedFile]);

  useEffect(() => {
    if (!preview) {
      return;
    }
    setIsloading(true);
    sendFile();
  }, [preview]);

  const onSelectFile = (files) => {
    if (!files || files.length === 0) {
      setSelectedFile(undefined);
      setImage(false);
      setData(undefined);
      return;
    }
    setSelectedFile(files[0]);
    setData(undefined);
    setImage(true);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onSelectFile,
    accept: "image/*",
  });

  if (data) {
    confidence = (parseFloat(data.confidence) * 100).toFixed(2);
  }

  return (
    <React.Fragment>
      <AppBar position="static" css={classes.appbar}>
        <Toolbar>
          <Typography css={classes.title} variant="h6" noWrap>
             Potato Disease Classification
          </Typography>
          <div css={classes.grow} />
          <Avatar src={cblogo}></Avatar>
        </Toolbar>
      </AppBar>
      <Container maxWidth={false} css={classes.mainContainer} disableGutters={true}>
        <Grid
          css={classes.gridContainer}
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={12}>
            <Card css={[classes.imageCard, !image && classes.imageCardEmpty]}>
              {image && (
                <CardActionArea>
                  <CardMedia
                    css={classes.media}
                    image={preview}
                    component="img"
                    title="Contemplative Reptile"
                  />
                </CardActionArea>
              )}
              {!image && (
                <CardContent css={classes.content}>
                  <div
                    {...getRootProps()}
                    style={{
                      border: "2px dashed #eeeeee",
                      padding: "20px",
                      textAlign: "center",
                    }}
                  >
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop an image of a potato plant leaf here, or click
                      to select one
                    </p>
                  </div>
                </CardContent>
              )}
              {data && (
                <CardContent css={classes.detail}>
                  <TableContainer component={Paper} css={classes.tableContainer}>
                    <Table css={classes.table} size="small" aria-label="simple table">
                      <TableHead css={classes.tableHead}>
                        <TableRow css={classes.tableRow}>
                          <TableCell css={classes.tableCell1}>Label:</TableCell>
                          <TableCell align="right" css={classes.tableCell1}>
                            Confidence:
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody css={classes.tableBody}>
                        <TableRow css={classes.tableRow}>
                          <TableCell component="th" scope="row" css={classes.tableCell}>
                            {data.class}
                          </TableCell>
                          <TableCell align="right" css={classes.tableCell}>
                            {confidence}%
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              )}
              {isLoading && (
                <CardContent css={classes.detail}>
                  <CircularProgress color="secondary" css={classes.loader} />
                  <Typography css={classes.title} variant="h6" noWrap>
                    Processing
                  </Typography>
                </CardContent>
              )}
            </Card>
          </Grid>
          {data && (
            <Grid item css={classes.buttonGrid}>
              <ColorButton
                variant="contained"
                css={classes.clearButton}
                color="primary"
                component="span"
                size="large"
                onClick={clearData}
                startIcon={<Clear fontSize="large" />}
              >
                Clear
              </ColorButton>
            </Grid>
          )}
        </Grid>
      </Container>
    </React.Fragment>
  );
};
