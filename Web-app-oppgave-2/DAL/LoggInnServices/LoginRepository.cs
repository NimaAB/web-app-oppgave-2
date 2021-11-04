using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.EntityFrameworkCore;
using Web_app_oppgave_2.Models;

namespace Web_app_oppgave_2.DAL.LoggInnServices
{
    public class LoginRepository : ILoginRepository
    {
        private readonly Db _db;

        public LoginRepository(Db db)
        {
            _db = db;
        }
        
        public async Task<bool> LoggInn(BrukerDto brukerDto)
        {
            try
            {
                Bruker funnet = await _db.Brukere.FirstOrDefaultAsync(b => b.Brukernavn == brukerDto.Brukernavn);
                var passordHash = LagHash(brukerDto.Passord, funnet.PassordSalt);
                var passordOk = passordHash.SequenceEqual(funnet.PassordHash);
                return passordOk;
            }
            catch
            {
                return false;
            }
        }

        public static byte[] LagHash(string passord, byte[] passordSalt)
        {
            return KeyDerivation.Pbkdf2(
                password: passord,
                salt: passordSalt,
                prf: KeyDerivationPrf.HMACSHA512,
                iterationCount: 1000,
                numBytesRequested: 32);
        }

        public static byte[] LagSalt()
        {
            var csp = new RNGCryptoServiceProvider();
            var salt = new byte[24];
            csp.GetBytes(salt);
            return salt;
        }
    }
}