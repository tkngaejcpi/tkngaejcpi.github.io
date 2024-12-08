---
title: 'Introduction to Markov Chain'
createdDate: 2024-12-05
tags: ['primer']
---

**What is a Markov chain?**

A Markov chain describes a process of random state transition.

In the chain,
the distribution of the next state only depends on the current state.

If you are now at state $s_t$,
in the next step,
you will move to state $s_{t + 1}$ with a probability of $T(s_t \to s_{t + 1})$.

---

**How do you advance a step for the state distribution?**

Let the current state distribution be $p_t$,
the state distribution in the next step is given by:

$$
p_{t + 1} (x)= \sum_s p_t(s) T(s \to x)
$$

---

**Why should you consider the state distribution, instead of just the state?**

Even if you start with a fixed state $s_t$,
just after a step,
it becomes a state distribution $T(s_t \to *)$.

By always considering the state distribution,
you can facilitate the iteration of the state in the chain.

A fixed state $s$ can be considered as a special state distribution,
which is:

$$
p_t(x)=
\begin{cases}
0 & x \neq s \\
1 & x = s
\end{cases}
$$

---

**What is a stationary distribution?**

A stationary distribution is a distribution $p_t$ that satisfies $p_{t + 1} = p_t$.

Once the state distribution become stationary,
it will remain same no matter how many steps are run.

---

**What is the detailed balance condition?**

If the detailed balance condition holds for a distribution $p_t$,
it means for any states $s_1, s_2$,
distribution $p_t$ satisfies:

$$
p_t(s_1) T(s_1 \to s_2) = p_t(s_2) T(s_2 \to s_1)
$$

It also implies $p_t$ is a stationary distribution,
because:

$$
\begin{aligned}
p_{t + 1} (x)
&= \sum_s p_t(s) T(s \to x) \\
&= \sum_s p_t(x) T(x \to s) \\
&= p_t(x) \sum_s T(x \to s) \\
&= p_t(x)
\end{aligned}
$$
