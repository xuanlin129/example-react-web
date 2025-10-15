const modules = import.meta.glob('./*.js', { eager: true });
export default modules;
