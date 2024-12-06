---
title: 'Introduction to MCMC (Markov Chain Monte Carlo)'
createdDate: 2024-12-05
tags: ['primer']
---

**How do you define a Markov Chain?**

A Markov chain is essentially:

- State space: $S$
- Transition function: $T: S \times S \mapsto [0, 1]$

In addition, $\forall x \in S, T(x, *)$ is a probability.

---

**How do you apply a Markov chain to a distribution?**

Let $p_t$ be a distribution at moment $t$,
then the distribution at moment $t + 1$ is:

$$
p_{t + 1} (x)= \sum_{y \in S} p_t(y) T(y, x)
$$

If $p_t$ is a fixed state of $x_0 \in S$,
which:

$$
p_t(x)=
\begin{cases}
0 & x \neq x_0 \\
1 & x = x_0
\end{cases}
$$

Then:

$$
\begin{aligned}
p_{t + 1}(x)
&= \sum_{y \in S} p_t(y) T(y, x) \\
&= T(x_0, x)
\end{aligned}
$$

Intuitively,
a Markov chain have a probability $T(x_0, x)$ to change a state $x_0$ to $x$ in "a moment".

---

**What is the stationary distribution of a Markov Chain?**

Distribution $p_t$ is the stationary distribution of the Markov chain if and only if $p_{t + 1} = p_t$.

Once the distribution becomes a stationary distribution in the Markov chain,
it "stays" in that distribution.

---

**What is the detail balance condition?**

If the detail balance condition holds for a distribution $p$,
it means:

$$
\forall x, y \in S,
p(x) T(x, y) = p(y) T(y, x)
$$

Meanwhile,
it is a stationary distribution,
ecause:

$$
\begin{aligned}
p_{t + 1} (x)
&= \sum_{y \in S} p_t(y) T(y, x) \\
&= \sum_{y \in S} p_t(x) T(x, y) \\
&= p_t(x) \sum_{y \in S} T(x, y) \\
&= p_t(x)
\end{aligned}
$$

---

**What is MCMC?**

MCMC is not a concrete method,
it is instead a general idea to sample from distribution.

You have to design a Markov chain,
whose stationary distribution is the distribution we want to sample from.

After serveral steps in the Markov chain,
the distribution will "converge" to the target distribution.

---

**What is the goal of Metropolis-Hasting method?**

The goal is to sample from a distribution $p$,
where we only know $f(x) \propto p(x)$,
and the normalized constant is difficult to calculate.

---
