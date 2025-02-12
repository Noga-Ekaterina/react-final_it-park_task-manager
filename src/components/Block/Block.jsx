import styles from "./Block.module.css"
import classNames from "classnames";

const Block = ({className, children}) => {
   return (
       <div className={classNames(styles.block, className && className)}>
          {children}
       </div>
   );
};

export default Block;
