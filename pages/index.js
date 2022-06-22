import {
  useAddress,
  useEditionDrop,
  useToken,
  useVote,
} from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import Login from "../components/Login";
import Proposal from "../components/Proposal";
import styles from "../styles/Home.module.css";
import { AddressZero } from "@ethersproject/constants";

export default function Home() {
  const address = useAddress();
  const editionDrop = useEditionDrop(
    "0x2f66A5A2BCB272FFC9EB873E3482A539BEB6f02a"
  );
  const token = useToken("0x6eefd78C9C73505AA71A13FeE31D9718775c9086");
  const vote = useVote("0x31c5840b31A1F97745bDCbB1E46954b686828E0F");

  const [hasClaimedNFT, setHasClaimedNFT] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);

  const [proposals, setProposals] = useState([]);
  const [isVoting, setIsVoting] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    if (!address) {
      return;
    }

    const checkBalance = async () => {
      try {
        const balance = await editionDrop.balanceOf(address, 0);
        if (balance.gt(0)) {
          setHasClaimedNFT(true);
        } else {
          setHasClaimedNFT(false);
        }
      } catch (error) {
        setHasClaimedNFT(false);
        console.error("No se pudo obtener el saldo de nft", error);
      }
    };
    checkBalance();
  }, [address, editionDrop]);

  useEffect(() => {
    if (!hasClaimedNFT) {
      return;
    }

    const getAllProposals = async () => {
      try {
        const proposals = await vote.getAll();
        setProposals(proposals);
      } catch (error) {
        console.error("no pudo obtener propuestas", error);
      }
    };
    getAllProposals();
  }, [hasClaimedNFT, vote]);

  useEffect(() => {
    if (!hasClaimedNFT) {
      return;
    }

    if (!proposals.length) {
      return;
    }

    const checkIfUserHasVoted = async () => {
      try {
        const hasVoted = await vote.hasVoted(proposals[0].proposalId, address);
        setHasVoted(hasVoted);
      } catch (error) {
        console.error("No se pudo verificar si la billetera votó", error);
      }
    };
    checkIfUserHasVoted();
  }, [hasClaimedNFT, proposals, address, vote]);

  const mintNft = async () => {
    setIsClaiming(true);
    try {
      await editionDrop.claim("0", 1);
      setHasClaimedNFT(true);
      console.log("🌊 Acuñó con éxito el NFT!");
    } catch (error) {
      console.error("no pudo reclamar", error);
    } finally {
      setIsClaiming(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsVoting(true);

    const votes = proposals.map((proposal) => {
      const voteResult = {
        proposalId: proposal.proposalId,
        vote: 2,
      };
      proposal.votes.forEach((vote) => {
        const elem = document.getElementById(
          proposal.proposalId + "-" + vote.type
        );

        if (elem.checked) {
          voteResult.vote = vote.type;
          return;
        }
      });
      return voteResult;
    });

    try {
      const delegation = await token.getDelegationOf(address);
      if (delegation === AddressZero) {
        await token.delegateTo(address);
      }
      try {
        await Promise.all(
          votes.map(async ({ proposalId, vote: _vote }) => {
            const proposal = await vote.get(proposalId);
            if (proposal.state === 1) {
              return vote.vote(proposalId, _vote);
            }
            return;
          })
        );
        try {
          await Promise.all(
            votes.map(async ({ proposalId }) => {
              const proposal = await vote.get(proposalId);

              if (proposal.state === 4) {
                return vote.execute(proposalId);
              }
            })
          );
          setHasVoted(true);
        } catch (err) {
          console.error("no pudo ejecutar los votos", err);
        }
      } catch (err) {
        console.error("no pudo votar", err);
      }
    } catch (err) {
      console.error("no se pudieron delegar tokens", err);
    } finally {
      setIsVoting(false);
    }
  };

  if (!address) {
    return <Login />;
  }

  if (hasClaimedNFT) {
    return (
      <div className={styles.container}>
        <h2>Propuestas Activas</h2>
        <form onSubmit={handleFormSubmit}>
          {proposals.map((proposal) => (
            <Proposal
              key={proposal.proposalId}
              votes={proposal.votes}
              description={proposal.description}
              proposalId={proposal.proposalId}
            />
          ))}

          <button
            onClick={handleFormSubmit}
            type="submit"
            disabled={isVoting || hasVoted}
            className={styles.button}
          >
            {isVoting
              ? "Votando..."
              : hasVoted
              ? "ya has votado"
              : "Enviar votos"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1>Mintee su membresía gratuita en LogRocket DAOs NFT 💳</h1>
      <button
        className={styles.button}
        disabled={isClaiming}
        onClick={() => mintNft()}
      >
        {isClaiming ? "Minteando..." : "Mintea tu NFT"}
      </button>
    </div>
  );
}
