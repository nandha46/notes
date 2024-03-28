function delay(ms) {
    console.log("Waiting for "+ms+"ms ...");
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

export default delay;