// svg files loaded as urls via webpack
// https://create-react-app.dev/docs/adding-images-fonts-and-files/
// https://stackoverflow.com/a/46629045
declare module "*.svg" {
  const value: string;
  export default value;
}