import styles from "./auth.module.css";

const sginup = () => {
  return (
    <form className={styles.form}>
      <h1>Sgin up</h1>
      <div className={styles.block}>
        <label> Username :</label>
        <input type="text" placeholder="username" />
      </div>
      <div className={styles.block}>
        <label> Email :</label>
        <input type="Email" placeholder="Email" />
      </div>
      <div className={styles.block}>
        <label> password :</label>
        <input type="password" placeholder="password" />
      </div>
      <div className={styles.block}>
        <label>  repeat password :</label>
        <input type="password" placeholder="repeat password" />
      </div>
      <div className={styles.block}>
        <label> Role :</label>
        <select> 
          <option value='framer' key='framer'> framer</option>
          <option value='student' key='student'> Student</option>
        </select>
      </div>
      <div className={styles.budiv}>
      <button type='submit'>Submit</button>
      </div>
    
    </form>
  );
};

export default sginup;
