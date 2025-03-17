export async function register(val) {
  const { username, email, password, confirmPassword } = val;

  try {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password, confirmPassword }),
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Something went wrong"); // ✅ Extract error message
    }

    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    throw new Error(err.message || "Something went wrong"); // ✅ Extract
  }
}

export async function getUsers() {
  try {
    const res = await fetch("/api/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error("Something went wrong");
    }

    return data;
  } catch (error) {
    throw new Error(error);
  }
}
